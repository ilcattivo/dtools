import React from 'react';
import UserMenu from './components/user-menu';
import './style.sass';

const DashboardLayout = ({ children }) => {
  return (
    <div className='dashboard-layout'>
      <div className='dashboard-layout__left'>
        <UserMenu />
      </div>
      <div className='dashboard-layout__right'>{children}</div>
    </div>
  );
};

export default DashboardLayout;
