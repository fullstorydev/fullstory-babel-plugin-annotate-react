# Babel Plugin: Annotate React
[![CircleCI](https://circleci.com/gh/fullstorydev/fullstory-babel-plugin-annotate-react.svg?style=svg)](https://circleci.com/gh/fullstorydev/fullstory-babel-plugin-annotate-react)

This is a Babel plugin that annotates React components with stable attributes that can be used to search and select using [FullStory](https://www.fullstory.com/). This is most useful when using a React system that generates dynamic names for Components or rearranges elements.

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

## React Native

To activate React Native support you must pass in a `native` plugin option like so:

    plugins: [
      ["@fullstory/babel-plugin-annotate-react", { native: true }]
    ]

See [Getting Started with FullStory React Native Capture](https://help.fullstory.com/hc/en-us/articles/360052419133-Getting-Started-with-FullStory-React-Native-Capture) for more info.

### `setFSTagName` setting

When using this library with [FullStory for Mobile Apps](https://www.fullstory.com/platform/mobile-apps/), we recommend setting `setFSTagName: true` to generate better privacy selectors. This setting will automatically set [`fsTagName`](https://developer.fullstory.com/mobile/react-native/auto-capture/set-tag-name/) with the value of `dataElement` or `dataComponent`, which will truncate the privacy selector and avoid duplicate naming.

Example:
* Before `RCTSafeAreaView[data-source-file="App.tsx"][data-element="SafeAreaView"][data-component="App"]`
* After `App[data-source-file="App.tsx"]`

```
plugins: [
  '@fullstory/react-native',
  ["@fullstory/annotate-react", {
    native: true,
    setFSTagName: true,
  }]
]
```

⚠️ Important: Existing FullStory privacy selectors and defined elements may need to be updated if the app was previously published without `setFSTagName: true`.
<!-- todo: write up a KB article to walk customers through transitioning to `fsTagName` if they have pre-existing privacy selectors or defined elements; link to it here -->


## Fragments

By default, the plugin does not annotate `React.Fragment`s because they may or may not contain a child that ends up being an HTML element.

An example with no child element:

    const componentName = () => (
      <Fragment>Hello, there.</Fragment>
    );

An example with child elements:

    const componentName = () => (
      <Fragment>
        Some text
        <h1>Hello, there.</h1> /* This one could be annotated */
        <a href="#foo">Click me</a>
      </Fragment>
    );


If you would like the plugin to attempt to annotate the first HTML element created by a Fragment (if it exists) then set the `annotate-fragments` flag:

    plugins: [
      ["@fullstory/babel-plugin-annotate-react", { "annotate-fragments": true }]
    ]

## Ignoring Components

If you would like the plugin to skip the annotation for certain components, use the `ignoreComponents` option:

```javascript
  plugins: [
      [
        "@fullstory/annotate-react",
        {
          ignoreComponents:[
            // each item must be a string array containing three items: file name, component name, element name
            // corresponding to the values for data-source-file, data-component, data-element
            // use wild card (*) to match anything
            ["myBoxComponent.jsx","MyBox","Box"],
            ["App.jsx", "*", "ThemeProvider"], // use wild-card to match anything
            ["App.jsx", "App", "*"],
          ]
        }
      ],
  ]
```

## Sample Apps

We have a few samples to demonstrate this plugin:

- [Single Page App](https://github.com/fullstorydev/fullstory-babel-plugin-annotate-react/tree/master/samples/single-page-app/)
- [styled-components](https://github.com/fullstorydev/fullstory-babel-plugin-annotate-react/tree/master/samples/styled-components/)
- [React native](https://github.com/fullstorydev/fullstory-babel-plugin-annotate-react/tree/master/samples/react-native-app/)

Much of the logic for adding the attributes originated in the [transform-react-qa-classes](https://github.com/davesnx/babel-plugin-transform-react-qa-classes/) plugin.

## Getting Help

Please refer to our [Knowledge Base article](https://help.fullstory.com/hc/en-us/articles/360049493054-FullStory-s-Annotate-React-plugin-for-Web-Native) or contact mobile-support@fullstory.com for additional help.

### React Native

Please see our [Getting Started with FullStory React Native Capture](https://help.fullstory.com/hc/en-us/articles/360052419133) guide or email mobile-support@fullstory.com for additional help.
