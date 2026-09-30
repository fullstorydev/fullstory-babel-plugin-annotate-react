// Smoke-tests the plugin against a real Babel 8 install.
//
// This can't live in the normal Jest suite: @babel/core@8 ships ESM-only
// (no "require" export condition, and it uses Node's package "imports" map
// internally), and Jest's resolver can't follow that even in
// --experimental-vm-modules mode. Plain Node's ESM loader handles it fine,
// so this runs as a standalone script instead.
//
// @babel/core-8 / @babel/preset-react-8 are npm aliases (see package.json)
// for the real @babel/core@8 / @babel/preset-react@8, installed alongside
// the Babel 7 versions the rest of the suite uses.
const assert = require("assert");
const plugin = require("../");

async function main() {
  const babel = await import("@babel/core-8");
  const presetReact = await import("@babel/preset-react-8");

  console.log(`Testing against @babel/core ${babel.version}`);

  function transform(code, options) {
    return babel.transformSync(code, {
      filename: "./filename-test.js",
      presets: [[presetReact.default, { runtime: "classic" }]],
      babelrc: false,
      configFile: false,
      ...options,
    }).code;
  }

  const cases = [
    {
      // A plain Babel 7 -> Babel 8 upgrade breaks here: @babel/types renamed
      // t.jSXAttribute/t.jSXIdentifier to t.jsxAttribute/t.jsxIdentifier, so
      // this throws "t.jSXIdentifier is not a function" without the plugin's
      // fallback. Uses a non-DOM tag name (CustomRoot) since plain HTML tags
      // like <div> are skipped for the "element" attribute (see
      // defaultIgnoredElements).
      name: "annotates a basic component",
      run: () => {
        const code = transform(
          `import React, { Component } from 'react';

class componentName extends Component {
  render() {
    return <CustomRoot><h1>Hello world</h1></CustomRoot>;
  }
}

export default componentName;
`,
          { plugins: [plugin] },
        );
        assert.match(code, /"data-component": "componentName"/);
        assert.match(code, /"data-element": "CustomRoot"/);
        assert.match(code, /"data-source-file": "filename-test\.js"/);
      },
    },
    {
      // Fragments (a separate JSXFragment code path in the plugin) also go
      // through applyAttributes, so exercise that too.
      name: "annotates a fragment",
      run: () => {
        const code = transform(
          `import React, { Fragment } from 'react';

class componentName extends React.Component {
  render() {
    return <Fragment><CustomChild>Hello world</CustomChild></Fragment>;
  }
}

export default componentName;
`,
          { plugins: [[plugin, { "annotate-fragments": true }]] },
        );
        assert.match(code, /"data-component": "componentName"/);
        assert.match(code, /"data-element": "CustomChild"/);
      },
    },
    {
      name: "respects the native and ignoreComponents options",
      run: () => {
        const code = transform(
          `import React, { Component } from 'react';
import { Image } from 'react-native';

class Bananas extends Component {
  render() {
    let pic = { uri: 'https://example.com/banana.jpg' };
    return <Image source={pic} fsClass="test-class" />;
  }
}
`,
          {
            plugins: [
              [
                plugin,
                { native: true, ignoreComponents: [["*", "*", "Image"]] },
              ],
            ],
          },
        );
        assert.doesNotMatch(code, /dataElement/);
        assert.doesNotMatch(code, /dataComponent/);
      },
    },
    {
      // React Compiler output, where JSX is extracted out of the return
      // statement into a cached variable.
      name: "annotates JSX extracted by React Compiler",
      run: () => {
        const code = transform(
          `import React from 'react';

function MyComponent() {
  let t0;
  if (t0 === Symbol.for("react.memo_cache_sentinel")) {
    t0 = <CustomRoot>Hello world</CustomRoot>;
  }
  return t0;
}

export default MyComponent;
`,
          { plugins: [[plugin, { reactCompiler: true }]] },
        );
        assert.match(code, /"data-component": "MyComponent"/);
        assert.match(code, /"data-element": "CustomRoot"/);
      },
    },
  ];

  let failed = 0;
  for (const { name, run } of cases) {
    try {
      run();
      console.log(`  ✓ ${name}`);
    } catch (err) {
      failed++;
      console.log(`  ✕ ${name}`);
      console.error(err);
    }
  }

  if (failed > 0) {
    console.log(`\n${failed}/${cases.length} Babel 8 smoke tests failed.`);
    process.exit(1);
  }
  console.log(`\nAll ${cases.length} Babel 8 smoke tests passed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
