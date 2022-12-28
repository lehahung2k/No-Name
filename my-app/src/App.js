import logo from './sharingan.png';
import './App.css';
import TextFileReader from './components/FileReader';

export default function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TextFileReader/>
      </div>
    </div>
  );
}
