import './App.css';

import DemoBox from './demoComponent'
import { ThemeProvider } from 'theming';

const theme = { 
  color: 'white',
  background: 'black',
};

  const App = () => {
    return <ThemeProvider theme={theme}>
      <DemoBox text="this is a text"/> 
    </ThemeProvider>
}

export default App;
