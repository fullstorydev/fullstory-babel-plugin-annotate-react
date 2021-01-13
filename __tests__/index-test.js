const babel = require('babel-core');
const plugin = require('../');
const assert = require('assert');

it('unknown-element snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component } from 'react';

class componentName extends Component {
  render() {
    return <bogus><h1>A</h1></bogus>;
  }
}

export default componentName;
`,
    {
      filename: "./filename-test.js",
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});

it('component-fragment snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component, Fragment } from 'react';

class componentName extends Component {
  render() {
    return <Fragment>A</Fragment>;
  }
}

export default componentName;
`,
    {
      filename: "./filename-test.js",
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('component-react-fragment snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component } from 'react';

class componentName extends Component {
  render() {
    return <React.Fragment>A</React.Fragment>;
  }
}

export default componentName;
`,
    {
      filename: "./filename-test.js",
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});

it('arrow-noreturn-fragment snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component, Fragment } from 'react';

const componentName = () => (
  <Fragment>
    <h1>Hello world</h1>
  </Fragment>
);

export default componentName;
`,
    {
      filename: "./filename-test.js",
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});

it('arrow-noreturn-annotate-fragment snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component, Fragment } from 'react';

const componentName = () => (
  <Fragment>
    <h1>Hello world</h1>
  </Fragment>
);

export default componentName;
`,
    {
      filename: "./filename-test.js",
      presets: ["@babel/preset-react"],
      plugins: [
        [plugin, { "annotate-fragments": true }]
      ]
    },
  );
  expect(code).toMatchSnapshot();
});

it('arrow-noreturn-annotate-fragment-once snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component, Fragment } from 'react';

const componentName = () => (
  <Fragment>
    <h1>Hello world</h1>
    <h1>Hola Sol</h1>
  </Fragment>
);

export default componentName;
`,
    {
      filename: "./filename-test.js",
      presets: ["@babel/preset-react"],
      plugins: [
        [plugin, { "annotate-fragments": true }]
      ]
    },
  );
  expect(code).toMatchSnapshot();
});


it('arrow-noreturn-annotate-fragment-no-whitespace snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component, Fragment } from 'react';

const componentName = () => (
  <Fragment><h1>Hello world</h1><h1>Hola Sol</h1></Fragment>
);

export default componentName;
`,
    {
      filename: "./filename-test.js",
      presets: ["@babel/preset-react"],
      plugins: [
        [plugin, { "annotate-fragments": true }]
      ]
    },
  );
  expect(code).toMatchSnapshot();
});


it('rawfunction-fragment snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component, Fragment } from 'react';

function SubComponent() {
  return <Fragment>Sub</Fragment>;
}

const componentName = () => {
  return <Fragment>
    <SubCoponent />
  </Fragment>;
};

export default componentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('arrow snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component } from 'react';

const componentName = () => {
  return <div>
    <h1>Hello world</h1>
  </div>;
};

export default componentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('option-attribute snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component } from 'react';

const componentName = () => {
  return <div>
    <h1>Hello world</h1>
  </div>;
};

export default componentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('component snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component } from 'react';

class componentName extends Component {
  render() {
    return <div>
        <h1>Hello world</h1>
      </div>;
  }
}

export default componentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('rawfunction-react-fragment snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component } from 'react';

function SubComponent() {
  return <React.Fragment>Sub</React.Fragment>;
}

const componentName = () => {
  return <React.Fragment>
    <SubCoponent />
  </React.Fragment>;
};

export default componentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('arrow-anonymous-react-fragment snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component } from 'react';

const componentName = () => {
  return (() => <React.Fragment>
    <h1>Hello world</h1>
  </React.Fragment>)();
};

export default componentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('arrow-noreturn snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component } from 'react';

const componentName = () => (
  <div>
    <h1>Hello world</h1>
  </div>
);

export default componentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('arrow-noreturn-react-fragment snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component } from 'react';

const componentName = () => (
  <React.Fragment>
    <h1>Hello world</h1>
  </React.Fragment>
);

export default componentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('tags snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, UIManager } from 'react-native';

UIManager.getViewManagerConfig('RCTView').NativeProps.fsClass = "String";

class Bananas extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return <Image source={pic} style={{ width: 193, height: 110, marginTop: 10 }} fsClass="test-class" />;
  }
}

class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return <View style={{ padding: 10 }}>
        <TextInput style={{
        backgroundColor: '#000',
        color: '#eee',
        padding: 8
      }} placeholder="Type here to translate!" // not supported on iOS
      onChangeText={text => this.setState({ text })} value={this.state.text} />
        <Text style={{ padding: 10, fontSize: 42 }}>
          {this.state.text.split(' ').map(word => word && '🍕').join(' ')}
        </Text>
      </View>;
  }
}

export default function App() {
  return <View style={styles.container}>
      <Text style={{ color: '#eee' }}>FullStory ReactNative testing app</Text>
      <Bananas />
      <PizzaTranslator />
    </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
`,
    {
      filename: "./filename-test.js",
      presets: ["@babel/preset-react"],
      plugins: [
        [plugin, { native: true }]
      ]
    },
  );
  expect(code).toMatchSnapshot();
});


it('option-format snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component } from 'react';

const componentName = () => {
  return <div>
    <h1>Hello world</h1>
  </div>;
};

export default componentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('pureComponent-react-fragment snapshot matches', () => {
  const { code } = babel.transform(
`import React from 'react';

class PureComponentName extends React.PureComponent {
    render() {
        return <React.Fragment>
            <h1>Hello world</h1>
        </React.Fragment>;
    }
}

export default PureComponentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('rawfunction snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component } from 'react';

function SubComponent() {
  return <div>Sub</div>;
}

const componentName = () => {
  return <div>
    <SubCoponent />
  </div>;
};

export default componentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('arrow-fragment snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component, Fragment } from 'react';

const componentName = () => {
  return <Fragment>
    <h1>Hello world</h1>
  </Fragment>;
};

export default componentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('arrow-react-fragment snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component } from 'react';

const componentName = () => {
  return <React.Fragment>
    <h1>Hello world</h1>
  </React.Fragment>;
};

export default componentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('nonJSX snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component } from 'react';

class TestClass extends Component {
  test() {
    return true;
  }
}

export default TestClass;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('pureComponent-fragment snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Fragment } from 'react';

class PureComponentName extends React.PureComponent {
    render() {
        return <Fragment>
            <h1>Hello world</h1>
        </Fragment>;
    }
}

export default PureComponentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('arrow-anonymous-fragment snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component, Fragment } from 'react';

const componentName = () => {
  return (() => <Fragment>
    <h1>Hello world</h1>
  </Fragment>)();
};

export default componentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('pure snapshot matches', () => {
  const { code } = babel.transform(
`import React from 'react';

class PureComponentName extends React.PureComponent {
    render() {
        return <div>
            <h1>Hello world</h1>
        </div>;
    }
}

export default PureComponentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [plugin]
    },
  );
  expect(code).toMatchSnapshot();
});


it('component-fragment-native snapshot matches', () => {
  const { code } = babel.transform(
`import React, { Component, Fragment } from 'react';

class componentName extends Component {
  render() {
    return <Fragment>A</Fragment>;
  }
}

export default componentName;
`,
    {
      presets: ["@babel/preset-react"],
      plugins: [
        [plugin, { native: true }]
      ]
    },
  );
  expect(code).toMatchSnapshot();
});


it('pure-native snapshot matches', () => {
  const { code } = babel.transform(
`import React from 'react';

class PureComponentName extends React.PureComponent {
    render() {
        return <div>
            <h1>Hello world</h1>
        </div>;
    }
}

export default PureComponentName;
`,
    {
      filename: "./filename-test.js",
      presets: ["@babel/preset-react"],
      plugins: [
        [plugin, { native: true }]
      ]
    },
  );
  expect(code).toMatchSnapshot();
});
