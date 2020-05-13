# Babel Plugin: Annotate React
​
This repo will hold a Babel plugin that annotates React components with stable attributes that can be used to search and select using FullStory. This is most useful when using a React system that generates dynamic names for Components.

For React on the web the attributes are `data-component` and `data-element`.

Example input:

	class HelloComponent extends Component {
		render() {
			return <div>
				<h1>Hello world</h1>
			</div>;
		}
	}

Example output:

	class componentName extends Component {
		render() {
			return React.createElement("div", {
				"data-element": "div",
				"data-component": "HelloComponent"
			}, React.createElement("h1", {
				"data-element": "h1"
			}, "Hello world"));
		}
	}


For React Native the attributes are `dataComponent` and `dataElement`.

To activate React Native support you must pass in a `native` plugin option like so:

	plugins: [
		["@fullstory/fullstory-babel-plugin-annotate-react", { native: true }]
	]


### Status: This is a work-in-progress and is not yet ready for production use.

Much of the logic for adding the attributes originated in the [transform-react-qa-classes](https://github.com/davesnx/babel-plugin-transform-react-qa-classes/) plugin.
