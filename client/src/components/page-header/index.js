import React from 'react';
import Logo from '../logo';
import Navbar from './components/navbar';
import './style.sass';

const PageHeader = () => {
  return (
    <header className='page-header'>
      <Logo link />
      <Navbar />
    </header>
  );
};

export default PageHeader;
