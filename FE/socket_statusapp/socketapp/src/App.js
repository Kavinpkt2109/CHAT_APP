import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<Login />} path='/'></Route>
          <Route element={<Dashboard />} path='/dashboard'></Route>
          <Route element={<Home />} path='/home' />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
