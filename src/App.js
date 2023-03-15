import './App.css';
import React, { useState, useEffect } from "react";
import Login from './screens/Login';
import { AuthProvider } from './contexts/AuthContext';
import {Routes, Route }from "react-router-dom";
import Register from './screens/Register';
import Home from './screens/Home';
import Message from './screens/Message'
import ForgotPassword from './screens/ForgotPassword';


function App() {
  return (
    <AuthProvider>
    <div className="App">
      <div style={{backgroundColor: 'white', borderRadius: '20px',display: 'grid',justifyContent: 'center', alignItems: 'center'}}> 
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='register' element={<Register/>} />
          <Route path='home' element={<Home/>}/>
          <Route path='forgot' element={<ForgotPassword/>}/>
          <Route path='message' element={<Message/>}/>
        </Routes>
      </div>
    </div>
    </AuthProvider>
  );
}

export default App;
