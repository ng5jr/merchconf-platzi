import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import '../styles/components/Layout.css';

const Layout = () => {
  return (
    <div className="Main">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
