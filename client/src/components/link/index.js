import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './style.sass';

const Link = ({ to, className, children, onClick }) => {
  const template = (
    <span onClick={onClick} className={`link ${className}`}>
      {children}
    </span>
  );
  if (to) return <RouterLink to={to}>{template}</RouterLink>;
  return template;
};

export default Link;
