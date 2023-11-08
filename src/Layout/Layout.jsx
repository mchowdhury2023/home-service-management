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
    const pageTitle = location.pathname === '/' ? siteName : `${siteName} | ${location.pathname.substring(1)}`;
    document.title = pageTitle;
  }, [location]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
