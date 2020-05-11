let parentName = 'data-component';
let elementName = 'data-element';

module.exports = function({ types: t }) {
	return {
		visitor: {
			FunctionDeclaration(path, state) {
				if (!path.node.id || !path.node.id.name) return
				const componentName = path.node.id.name
				functionBodyPushAttributes(t, path, componentName)
			},
			ArrowFunctionExpression(path, state) {
				if (!path.parent.id || !path.parent.id.name) return
				const componentName = path.parent.id.name
				functionBodyPushAttributes(t, path, componentName)
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
						processJSXElement(t, arg)
						const openingElement = arg.get('openingElement')
						if (isReactFragment(openingElement)) return
						openingElement.node.attributes.push(
							t.jSXAttribute(
								t.jSXIdentifier(parentName),
								t.stringLiteral((name.node && name.node.name) || 'unknown')
							)
						)
					}
				})
			},
		}
	}
}

function isReactFragment(openingElement) {
	return (
		openingElement.node.name.name === 'Fragment' ||
		(openingElement.node.name.type === 'JSXMemberExpression' &&
			openingElement.node.name.object.name === 'React' &&
			openingElement.node.name.property.name === 'Fragment')
	)
}

function addAttributesToJSXElement(t, jsxElement) {
	if (!jsxElement || !jsxElement.node || !jsxElement.node.name) {
		return
	}
	jsxElement.node.attributes = jsxElement.node.attributes || []
	jsxElement.node.attributes.push(
		t.jSXAttribute(
			t.jSXIdentifier(elementName),
			t.stringLiteral(jsxElement.node.name.name || 'unknown')
		)
	)
}

function processJSXElement(t, jsxElement) {
	if (!jsxElement) {
		return
	}
	addAttributesToJSXElement(t, jsxElement.get('openingElement'))
	const children = jsxElement.get('children')
	if (children && children.length) {
		children.forEach(element => processJSXElement(t, element))
	}
}

function functionBodyPushAttributes(t, path, componentName) {
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
	processJSXElement(t, jsxElement)
}
