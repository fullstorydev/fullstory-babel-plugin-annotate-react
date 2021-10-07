import "./App.css";

import DemoBox from "./demoComponent";
import jss from "jss";
import {
  ThemeProvider,
  StylesProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import jssPresetDefault from "jss-preset-default";

jss.setup(jssPresetDefault());
const theme = createMuiTheme({ colors: { red: "red" } });

const App = () => {
  return (
    <StylesProvider // fullstory-babel-plugin-annotate-react-disable-component
      jss={jss}
    >
      <ThemeProvider // fullstory-babel-plugin-annotate-react-disable-component
        theme={theme}
      >
        <DemoBox text="this is a text" />
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
