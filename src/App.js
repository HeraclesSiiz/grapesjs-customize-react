import logo from './logo.svg';
import './App.css';
import './static/tabler-icons.css';
import 'grapesjs/dist/css/grapes.min.css';
import Builder from './builder/index.jsx';

function App() {
  return(
    <div className="App">
      <Builder />;
    </div>
  );
}

export default App;
