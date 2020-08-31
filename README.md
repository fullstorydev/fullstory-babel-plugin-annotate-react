# Babel Plugin: Annotate React
[![CircleCI](https://circleci.com/gh/fullstorydev/fullstory-babel-plugin-annotate-react.svg?style=svg)](https://circleci.com/gh/fullstorydev/fullstory-babel-plugin-annotate-react)

This is a Babel plugin that annotates React components with stable attributes that can be used to search and select using FullStory. This is most useful when using a React system that generates dynamic names for Components or rearranges elements.

For React on the web the attributes are `data-component`, `data-element`, and `data-source-file`. For React Native the attributes are `dataComponent`, `dataElement`, and `dataSourceFile`.

The component attribute names the `React.Component` and the element attribute names the original native elements like `View` or `Image` or an emitter of DOM elements like `Fragment`.

Example input:

    class HelloComponent extends Component {
      render() {
        return <div>
          <h1>Hello world</h1>
        </div>;
      }
    }

Example JS output:

    class HelloComponent extends Component {
      render() {
        return React.createElement("div", {
          "data-component": "HelloComponent",
          "data-file-source": "hello-component.js"
        }, React.createElement("h1", {
          null
        }, "Hello world"));
      }
    }

Final render:

    <div data-component="HelloComponent" data-file-source="hello-component.js">
      <h1>Hello world</h1>
    </div>

To activate React Native support you must pass in a `native` plugin option like so:

    plugins: [
      ["@fullstory/babel-plugin-annotate-react", { native: true }]
    ]

We have a few samples to demonstrate this plugin:

- [Single Page App](./samples/single-page-app/)
- [styled-components](./samples/styled-components/)
- [React native](./samples/react-native-app/)

Much of the logic for adding the attributes originated in the [transform-react-qa-classes](https://github.com/davesnx/babel-plugin-transform-react-qa-classes/) plugin.
