import './App.css';
import Redirect from './Redirect.js'
import Image from './Image.js'
import Text from './Text.js'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Image/>
        <Text/>
        <Redirect href={"https://github.com/fullstorydev/fullstory-babel-plugin-annotate-react"} text={"View the source code"}/>
        <br/>
        <Redirect href={"https://developer.fullstory.com/"} text={"Visit the FullStory Developer Center"}/>
      </header>
    </div>
  );
}

export default App;
