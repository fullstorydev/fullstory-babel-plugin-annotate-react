const babel = require('babel-core');
const plugin = require('../');
const assert = require('assert');


it('matches expectations', () => {
  for (let expectation of expectations) {
    const {code} = babel.transform(
      expectation.input,
      {
        presets: ["@babel/preset-react"],
        plugins: [plugin]
      },
    );
    expect(code).toMatchSnapshot();
  }
});

const expectations = [
  {
    input: `
      import React, { Component } from 'react';
      class componentName extends Component {
        render() {
          return <div>
              <h1>Hello world</h1>
            </div>;
        }
      }
      export default componentName;
      `
  },
  {
    input: `
      import React, { Component, Fragment } from 'react';
      const componentName = () => {
        return (() => <Fragment>
          <h1>Hello world</h1>
        </Fragment>)();
      };
      export default componentName;
      `
  }
]
