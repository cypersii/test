import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Login from './components/login/login';
import Search from './components/search/search';

const App = () => {
  return (
    <div>
    <Router>
        <Routes>
          <Route path='/search' element={<Search/>}/>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login />} />
        </Routes>
    </Router>
    </div>
  );
};

export default App;

