import logo from './logo.svg';
import './App.css';
import './normal.css'
import { Route, Routes } from 'react-router-dom';
import Home from './view/Home/Home';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route
            path='/'
            element={<Home/>}
          />
        </Routes>
    </div>
  );
}

export default App;
