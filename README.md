# Babel Plugin: Annotate React
​
This repo will hold a Babel plugin that annotates React components with two attributes: `data-component` and `data-element`. These attribues will allow you to use selectors to more accurately target React-rendered components when testing and when emitting Fullstory recording events.
​
This plugin will work with both web and native React applications.  
​
### Status: This is a work-in-progress and is not yet ready for production use.

Much of the logic for adding the attributes originated in the [transform-react-qa-classes](https://github.com/davesnx/babel-plugin-transform-react-qa-classes/) plugin.
