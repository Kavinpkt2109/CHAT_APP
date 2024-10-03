import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Chat from './components/Chat';
import { store } from './stores/store';
import { Provider } from 'react-redux'

function App() {
  return (
    <Router>
      <div className="App">
        <Provider store={store}>
          <Routes>
            <Route element={<Login />} path='/'></Route>
            <Route element={<Dashboard />} path='/dashboard'></Route>
            <Route element={<Home />} path='/home' />
            <Route element={<Chat />} path='/chat' />
          </Routes>
        </Provider>
      </div>
    </Router>
  );
}

export default App;
