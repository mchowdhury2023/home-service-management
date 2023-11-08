import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
  const siteName = 'HomeScapeHeroes';
  // Replace the slash with a pipe or any other separator, if needed, for the root path, avoid adding the separator
  const pageTitle = location.pathname === '/' ? siteName : `${siteName} | ${location.pathname.substring(1)}`;
  // Set document title
  document.title = pageTitle;
}, [location]);
  
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Layout