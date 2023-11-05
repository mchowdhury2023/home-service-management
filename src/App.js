// src/App.js
import React from 'react';
import Button from '@mui/material/Button'; // Material-UI button component
import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import { toast } from 'react-toastify';

function App() {

  const isLoggedIn = false;

  return (
    <div className="App">
        <Navbar isLoggedIn={isLoggedIn}></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  );
}

export default App;
