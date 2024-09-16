import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <Router>
    <div className="App">
     <Routes>
      <Route element={<Login/>} path='/'></Route>
      <Route element={<Dashboard/>} path='/home'></Route>

     </Routes>
    </div>
    </Router>
  );
}

export default App;
