import React from 'react';
import './style.sass';

const Header = ({ title, className: classes }) => {
  return <h2 className={`header ${classes ? classes : ''}`}>{title}</h2>;
};

export default Header;
