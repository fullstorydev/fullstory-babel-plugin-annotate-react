const webParentName = 'data-component';
const webElementName = 'data-element';
const webSourceFileName = 'data-source-file';

const nativeParentName = 'dataComponent';
const nativeElementName = 'dataElement';
const nativeSourceFileName = 'dataSourceFile';

const nativeOptionName = 'native';

module.exports = function({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(path, state) {
        if (!path.node.id || !path.node.id.name) return
        const componentName = path.node.id.name
        functionBodyPushAttributes(t, path, componentName, attributeNamesFromState(state)[1])
      },
      ArrowFunctionExpression(path, state) {
        if (!path.parent.id || !path.parent.id.name) return
        const componentName = path.parent.id.name
        functionBodyPushAttributes(t, path, componentName, attributeNamesFromState(state)[1])
      },
      ClassDeclaration(path, state) {
        const name = path.get('id')
        const properties = path.get('body').get('body')
        const render = properties.find(prop => {
          return (
            prop.isClassMethod() &&
            prop.get('key').isIdentifier({ name: 'render' })
          )
        })
        if (!render || !render.traverse) return

        const [
          parentAttributeName,
          elementAttributeName,
          sourceFileAttributeName
        ] = attributeNamesFromState(state)
        render.traverse({
          ReturnStatement(returnStatement) {
            const arg = returnStatement.get('argument')
            if (!arg.isJSXElement()) return
            processJSXElement(t, arg, elementAttributeName)
            const openingElement = arg.get('openingElement')
            if (isReactFragment(openingElement)) return
            // Add a stable attribute for the Component parent name
            openingElement.node.attributes.push(
              t.jSXAttribute(
                t.jSXIdentifier(parentAttributeName),
                t.stringLiteral((name.node && name.node.name) || 'unknown')
              )
            )
            if (typeof state.file.opts.parserOpts.sourceFileName === 'string') {
              // Add a stable attribute for the source file name
              // Note: this will be undefined in some cases like tests so we ignore it there
              const fileName = state.file.opts.parserOpts.sourceFileName.split('/').pop()
              openingElement.node.attributes.push(
                t.jSXAttribute(
                  t.jSXIdentifier(sourceFileAttributeName),
                  t.stringLiteral(fileName)
                )
              )
            }
          }
        })
      },
    }
  }
}

function attributeNamesFromState(state) {
  if(state.opts[nativeOptionName] === true) {
    return [nativeParentName, nativeElementName, nativeSourceFileName]
  }
  return [webParentName, webElementName, webSourceFileName]
}

function isReactFragment(openingElement) {
  return (
    openingElement.node.name.name === 'Fragment' ||
    (openingElement.node.name.type === 'JSXMemberExpression' &&
      openingElement.node.name.object.name === 'React' &&
      openingElement.node.name.property.name === 'Fragment')
  )
}

function addAttributesToJSXElement(t, jsxElement, elementAttributeName) {
  if (!jsxElement || !jsxElement.node || !jsxElement.node.name) {
    return
  }
  jsxElement.node.attributes = jsxElement.node.attributes || []
  jsxElement.node.attributes.push(
    t.jSXAttribute(
      t.jSXIdentifier(elementAttributeName),
      t.stringLiteral(jsxElement.node.name.name || 'unknown')
    )
  )
}

function processJSXElement(t, jsxElement, elementAttributeName) {
  if (!jsxElement) {
    return
  }
  addAttributesToJSXElement(t, jsxElement.get('openingElement'), elementAttributeName)
  const children = jsxElement.get('children')
  if (children && children.length) {
    children.forEach(element => processJSXElement(t, element, elementAttributeName))
  }
}

function functionBodyPushAttributes(t, path, componentName, elementAttributeName) {
  let jsxElement = null
  const functionBody = path.get('body').get('body')
  if (functionBody.parent && functionBody.parent.type === 'JSXElement') {
    const maybeJsxElement = functionBody.find(c => {
      return c.type === 'JSXElement'
    })
    if (!maybeJsxElement) return
    jsxElement = maybeJsxElement
  } else {
    const returnStatement = functionBody.find(c => {
      return c.type === 'ReturnStatement'
    })
    if (!returnStatement) {
      return
    }
    const arg = returnStatement.get('argument')
    if (!arg || !arg.isJSXElement()) {
      return
    }
    jsxElement = arg
  }
  processJSXElement(t, jsxElement, elementAttributeName)
}
