# Single Page App Sample

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using the "single-page-app" template. It was then "ejected" so that the configuration files are locally editable.

To enable the @fullstory/babel-plugin-annotate-react plugin we edited the `fullstory-babel-plugin-annotate-react/samples/single-page-app/config/webpack.config.js` file. Since this sample is using the local plugin we use `../..` as the plugin name (around line 376) but you should use the npm package name of `@fullstory/babel-plugin-annotate-react`.


To test this sample:

	cd fullstory-babel-plugin-annotate-react/samples/single-page-app/
	npm install
	npm run start

A browser window should open and you can compare the source components in `fullstory-babel-plugin-annotate-react/samples/single-page-app/src/App.js` to the rendered DOM. Look for the `data-component`, `data-element`, and `data-source-file` attributes added by this plugin.


