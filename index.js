const webComponentName = 'data-component';
const webElementName = 'data-element';
const webSourceFileName = 'data-source-file';

const nativeComponentName = 'dataComponent';
const nativeElementName = 'dataElement';
const nativeSourceFileName = 'dataSourceFile';

const nativeOptionName = 'native';

module.exports = function({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(path, state) {
        if (!path.node.id || !path.node.id.name) return
        functionBodyPushAttributes(
          t,
          path,
          path.node.id.name,
          sourceFileNameFromState(state),
          ...attributeNamesFromState(state)
        )
      },
      ArrowFunctionExpression(path, state) {
        if (!path.parent.id || !path.parent.id.name) return
        functionBodyPushAttributes(
          t,
          path,
          path.parent.id.name,
          sourceFileNameFromState(state),
          ...attributeNamesFromState(state)
        )
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

        render.traverse({
          ReturnStatement(returnStatement) {
            const arg = returnStatement.get('argument')
            if (!arg.isJSXElement()) return
            processJSXElement(
              t,
              arg,
              name.node && name.node.name,
              sourceFileNameFromState(state),
              ...attributeNamesFromState(state)
            )
          }
        })
      },
    }
  }
}

function sourceFileNameFromState(state) {
  const name = state.file.opts.parserOpts.sourceFileName
  if (typeof name === 'string') return name.split('/').pop()
  return undefined
}

function attributeNamesFromState(state) {
  if(state.opts[nativeOptionName] === true) {
    return [nativeComponentName, nativeElementName, nativeSourceFileName]
  }
  return [webComponentName, webElementName, webSourceFileName]
}

function isReactFragment(openingElement) {
  if (
    !openingElement.node ||
    !openingElement.node.name ||
    !openingElement.node.name.name ||
    !openingElement.node.name.type ||
    !openingElement.node.name.object ||
    !openingElement.node.name.property
  ) return

  return (
    openingElement.node.name.name === 'Fragment' ||
    (openingElement.node.name.type === 'JSXMemberExpression' &&
      openingElement.node.name.object.name === 'React' &&
      openingElement.node.name.property.name === 'Fragment')
  )
}

function applyAttributes(t, openingElement, componentName, sourceFileName, componentAttributeName, elementAttributeName, sourceFileAttributeName) {
  if (!openingElement
      || isReactFragment(openingElement)
      || !openingElement.node
      || !openingElement.node.name
    ) {
    return
  }
  if (!openingElement.node.attributes) openingElement.node.attributes = {}

  // Add a stable attribute for the element name
  if(openingElement.node.attributes.find(node => {
    if (!node.name) return
    return node.name.name === elementAttributeName
  }) == null){
    openingElement.node.attributes.push(
      t.jSXAttribute(
        t.jSXIdentifier(elementAttributeName),
        t.stringLiteral(openingElement.node.name.name || 'unknown')
      )
    )
  }

  // Add a stable attribute for the component name (absent for non-root elements)
  if(componentName && (openingElement.node.attributes.find(node => {
    if (!node.name) return
    return node.name.name === componentAttributeName
  }) == null)){
    openingElement.node.attributes.push(
      t.jSXAttribute(
        t.jSXIdentifier(componentAttributeName),
        t.stringLiteral(componentName)
      )
    )
  }

  // Add a stable attribute for the source file name (absent for non-root elements)
  if(sourceFileName && (openingElement.node.attributes.find(node => {
    if (!node.name) return
    return node.name.name === sourceFileAttributeName
  }) == null)){
    openingElement.node.attributes.push(
      t.jSXAttribute(
        t.jSXIdentifier(sourceFileAttributeName),
        t.stringLiteral(sourceFileName)
      )
    )
  }
}

function processJSXElement(t, jsxElement, componentName, sourceFileName, componentAttributeName, elementAttributeName, sourceFileAttributeName) {
  if (!jsxElement) {
    return
  }

  applyAttributes(t, jsxElement.get('openingElement'), componentName, sourceFileName, componentAttributeName, elementAttributeName, sourceFileAttributeName)
  const children = jsxElement.get('children')
  if (children && children.length) {
    // Children don't receive the data-component or data-source-file attribute so we pass null for componentName and sourceFileName
    children.forEach(element => processJSXElement(t, element, null, null, componentAttributeName, elementAttributeName, sourceFileAttributeName))
  }
}

function functionBodyPushAttributes(t, path, componentName, sourceFileName, componentAttributeName, elementAttributeName, sourceFileAttributeName) {
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
  if (!jsxElement) return

  processJSXElement(t, jsxElement, componentName, sourceFileName, componentAttributeName, elementAttributeName, sourceFileAttributeName)
}
