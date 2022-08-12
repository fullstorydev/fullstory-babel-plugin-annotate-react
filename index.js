const webComponentName = 'data-component';
const webElementName = 'data-element';
const webSourceFileName = 'data-source-file';

const nativeComponentName = 'dataComponent';
const nativeElementName = 'dataElement';
const nativeSourceFileName = 'dataSourceFile';

const nativeOptionName = 'native';
const annotateFragmentsOptionName = 'annotate-fragments';
const ignoreComponentsOptionName = 'ignoreComponents';
const ignoreSourceFileOptionName = 'ignoreSourceFile';

const knownIncompatiblePlugins = [
  // This module might be causing an issue preventing clicks. For safety, we won't run on this module.
  'react-native-testfairy',
  // This module checks for unexpected property keys and throws an exception.
  '@react-navigation',
  // The victory* modules use `dataComponent` and we get a collision.
  'victory',
  'victory-area',
  'victory-axis',
  'victory-bar',
  'victory-box-plot',
  'victory-brush-container',
  'victory-brush-line',
  'victory-candlestick',
  'victory-canvas',
  'victory-chart',
  'victory-core',
  'victory-create-container',
  'victory-cursor-container',
  'victory-errorbar',
  'victory-group',
  'victory-histogram',
  'victory-legend',
  'victory-line',
  'victory-native',
  'victory-pie',
  'victory-polar-axis',
  'victory-scatter',
  'victory-selection-container',
  'victory-shared-events',
  'victory-stack',
  'victory-tooltip',
  'victory-vendor',
  'victory-voronoi',
  'victory-voronoi-container',
  'victory-zoom-container',
];

module.exports = function({ types: t }) {
  return {
    pre() {
      this.ignoreComponentsFromOption = this.opts[ignoreComponentsOptionName] || [];
    },
    visitor: {
      FunctionDeclaration(path, state) {
        if (!path.node.id || !path.node.id.name) return
        if (isKnownIncompatiblePluginFromState(state)) return
        functionBodyPushAttributes(
          state.opts[annotateFragmentsOptionName] === true,
          t,
          path,
          path.node.id.name,
          sourceFileNameFromState(state),
          attributeNamesFromState(state),
          this.ignoreComponentsFromOption,
        )
      },
      ArrowFunctionExpression(path, state) {
        if (!path.parent.id || !path.parent.id.name) return
        if (isKnownIncompatiblePluginFromState(state)) return
        functionBodyPushAttributes(
          state.opts[annotateFragmentsOptionName] === true,
          t,
          path,
          path.parent.id.name,
          sourceFileNameFromState(state),
          attributeNamesFromState(state),
          this.ignoreComponentsFromOption,
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
        if (isKnownIncompatiblePluginFromState(state)) return

        const ignoreComponentsFromOption = this.ignoreComponentsFromOption;

        render.traverse({
          ReturnStatement(returnStatement) {
            const arg = returnStatement.get('argument')
            if (!arg.isJSXElement()) return
            processJSXElement(
              state.opts[annotateFragmentsOptionName] === true,
              t,
              arg,
              name.node && name.node.name,
              sourceFileNameFromState(state),
              attributeNamesFromState(state),
              ignoreComponentsFromOption
            )
          }
        })
      },
    }
  }
}

function fullSourceFileNameFromState(state) {
  const name = state.file.opts.parserOpts.sourceFileName
  if (typeof name !== 'string') {
    return undefined
  }
  return name
}

function sourceFileNameFromState(state) {
  const name = fullSourceFileNameFromState(state)
  if (name === undefined) {
    return undefined
  }

  if (name.indexOf('/') !== -1) {
    return name.split('/').pop()
  } else if (name.indexOf('\\') !== -1) {
    return name.split('\\').pop()
  } else {
    return name
  }
}

function isKnownIncompatiblePluginFromState(state) {
  const fullSourceFileName = fullSourceFileNameFromState(state)
  if (fullSourceFileName == undefined) {
    return false
  }

  for (let i = 0; i < knownIncompatiblePlugins.length; i += 1) {
    let pluginName = knownIncompatiblePlugins[i];
    if (fullSourceFileName.includes("/node_modules/" + pluginName + "/") || 
        fullSourceFileName.includes("\\node_modules\\" + pluginName + "\\")) {
      return true
    }
  }

  return false
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
    !openingElement.node.name
  ) return

  if (openingElement.node.name.name === 'Fragment') return true;

  if (
    !openingElement.node.name.type ||
    !openingElement.node.name.object ||
    !openingElement.node.name.property
  ) return

  return (
    openingElement.node.name.type === 'JSXMemberExpression' &&
    openingElement.node.name.object.name === 'React' &&
    openingElement.node.name.property.name === 'Fragment'
  )
}

function applyAttributes(t, openingElement, componentName, sourceFileName, attributeNames, ignoreComponentsFromOption) {
  const [componentAttributeName, elementAttributeName, sourceFileAttributeName] = attributeNames;
  if (!openingElement
      || isReactFragment(openingElement)
      || !openingElement.node
      || !openingElement.node.name
    ) {
    return
  }
  if (!openingElement.node.attributes) openingElement.node.attributes = {}

  const elementName = openingElement.node.name.name || 'unknown'

  const ignoredComponentFromOptions = ignoreComponentsFromOption && !!ignoreComponentsFromOption.find(component =>
    matchesIgnoreRule(component[0], sourceFileName) &&
    matchesIgnoreRule(component[1], componentName) &&
    matchesIgnoreRule(component[2], elementName)
  )

  let ignoredElement = false
  // Add a stable attribute for the element name but only for non-DOM names
  if (
    !ignoredComponentFromOptions &&
    !hasNodeNamed(openingElement, componentAttributeName)
  ) {
    if (defaultIgnoredElements.includes(elementName)) {
      ignoredElement = true
    } else {
      openingElement.node.attributes.push(
        t.jSXAttribute(
          t.jSXIdentifier(elementAttributeName),
          t.stringLiteral(elementName)
        )
      )
    }
  }

  // Add a stable attribute for the component name (absent for non-root elements)
  if (
    componentName
    && !ignoredComponentFromOptions
    && !hasNodeNamed(openingElement, componentAttributeName)) {
    openingElement.node.attributes.push(
      t.jSXAttribute(
        t.jSXIdentifier(componentAttributeName),
        t.stringLiteral(componentName)
      )
    )
  }

  // Add a stable attribute for the source file name (absent for non-root elements)
  if (
    sourceFileName
    && ignoreSourceFileOptionName !== true
    && !ignoredComponentFromOptions
    && (componentName || ignoredElement === false)
    && !hasNodeNamed(openingElement, sourceFileAttributeName)
  ) {
    openingElement.node.attributes.push(
      t.jSXAttribute(
        t.jSXIdentifier(sourceFileAttributeName),
        t.stringLiteral(sourceFileName)
      )
    )
  }
}

function processJSXElement(annotateFragments, t, jsxElement, componentName, sourceFileName, attributeNames, ignoreComponentsFromOption) {
  if (!jsxElement) {
    return
  }
  const openingElement = jsxElement.get('openingElement')

  applyAttributes(t, openingElement, componentName, sourceFileName, attributeNames, ignoreComponentsFromOption)

  const children = jsxElement.get('children')
  if (children && children.length) {
    let shouldSetComponentName = annotateFragments
    for (let i=0; i < children.length; i += 1){
      // Children don't receive the data-component attribute so we pass null for componentName unless it's the first child of a Fragment with a node and `annotateFragments` is true
      if (shouldSetComponentName && children[i].get('openingElement') && children[i].get('openingElement').node) {
        shouldSetComponentName = false
        processJSXElement(annotateFragments, t, children[i], componentName, sourceFileName, attributeNames, ignoreComponentsFromOption)
      } else {
        processJSXElement(annotateFragments, t, children[i], null, sourceFileName, attributeNames, ignoreComponentsFromOption)
      }
    }
  }
}

function functionBodyPushAttributes(annotateFragments, t, path, componentName, sourceFileName, attributeNames, ignoreComponentsFromOption) {
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
  processJSXElement(annotateFragments, t, jsxElement, componentName, sourceFileName, attributeNames, ignoreComponentsFromOption)
}

function matchesIgnoreRule(rule, name) {
  return rule === '*' || rule === name;
}

function hasNodeNamed(openingElement, name) {
  return openingElement.node.attributes.find(node => {
    if (!node.name) return
    return node.name.name === name
  })
}

// We don't write data-element attributes for these names
const defaultIgnoredElements = [
  'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio',
  'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button',
  'canvas', 'caption', 'cite', 'code', 'col', 'colgroup',
  'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt',
  'em', 'embed',
  'fieldset', 'figure', 'footer', 'form',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
  'i', 'iframe', 'img', 'input', 'ins',
  'kbd', 'keygen',
  'label', 'legend', 'li', 'link',
  'main', 'map', 'mark', 'menu', 'menuitem', 'meter',
  'nav', 'noscript',
  'object', 'ol', 'optgroup', 'option', 'output',
  'p', 'param', 'pre', 'progress', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby',
  's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup',
  'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track',
  'u', 'ul',
  'var', 'video',
  'wbr'
]
