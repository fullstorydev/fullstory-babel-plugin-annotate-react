# Styled Components Sample

This project was bootstrapped with [this handy template](https://github.com/akhtarvahid/react-webpack-babel) from [this article](https://medium.com/@akhtarvahid543/steps-to-setup-react-webpack-and-babel-from-scratch-beginner-ab0b165276fa). Most of the changes to that template were to add [`styled-components`](https://styled-components.com/) support.

To enable the @fullstory/babel-plugin-annotate-react plugin we edited the `fullstory-babel-plugin-annotate-react/samples/styled-components/.babelrc` file. Since this sample is using the local plugin we use `../..` as the plugin name (around line 3) but you should use the npm package name of `@fullstory/babel-plugin-annotate-react`.

To test this sample:

	cd fullstory-babel-plugin-annotate-react/samples/styled-components/
	npm install
	npm run start

A browser window should open and you can compare the source components in `fullstory-babel-plugin-annotate-react/samples/styled-components/src/components/App.js` to the rendered DOM. Look for the `data-component`, `data-element`, and `data-source-file` attributes added by this plugin.
