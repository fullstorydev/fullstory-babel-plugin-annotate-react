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
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <DemoBox text="this is a text" />
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
