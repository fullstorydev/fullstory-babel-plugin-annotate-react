# Babel Plugin: Annotate React
​
### Status: This is a work-in-progress and is not yet ready for production use.

This repo will hold a Babel plugin that annotates React components with stable attributes that can be used to search and select using FullStory. This is most useful when using a React system that generates dynamic names for Components or rearranges elements.

For React on the web the attributes are `data-component` and `data-element`. For React Native the attributes are `dataComponent` and `dataElement`.

The component attribute names the React.Component and the element attribute names either a web DOM element like `h1` or `input` or a native element like `View` or `Image`.

Example input:

    class HelloComponent extends Component {
      render() {
        return <div>
          <h1>Hello world</h1>
        </div>;
      }
    }

Example output:

    class HelloComponent extends Component {
      render() {
        return React.createElement("div", {
          "data-element": "div",
          "data-component": "HelloComponent"
        }, React.createElement("h1", {
          "data-element": "h1"
        }, "Hello world"));
      }
    }


To activate React Native support you must pass in a `native` plugin option like so:

    plugins: [
      ["@fullstory/babel-plugin-annotate-react", { native: true }]
    ]


Much of the logic for adding the attributes originated in the [transform-react-qa-classes](https://github.com/davesnx/babel-plugin-transform-react-qa-classes/) plugin.
