import React, { Component } from "react";
import styled from 'styled-components'

const Title = styled.h1`
  font-family: sans-serif;
  font-size: 1.5em;
`;
const Anchor = styled.a`
  color: purple;
`;

class App extends Component {
  render() {
    return (
      <div className="foo">
        <Title>
          A title
          <br />
          <Anchor href="#foo">An anchor</Anchor>
        </Title>
      </div>
    );
  }
}
export default App;
