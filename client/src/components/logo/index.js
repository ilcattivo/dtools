import React from 'react';
import { Link } from 'react-router-dom';
import './style.sass';

const Logo = ({ link }) => {
  const inner = link ? <Link to='/'>D-Tools</Link> : <span>D-Tools</span>;
  return <div className='logo'>{inner}</div>;
};

export default Logo;
