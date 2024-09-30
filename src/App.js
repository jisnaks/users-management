
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import React from "react";
import Login from './Components/Login';
import UserList from './Components/UserList';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/userlist' element={<UserList/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
