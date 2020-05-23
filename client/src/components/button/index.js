import React from 'react';
import { Link } from 'react-router-dom';
import './style.sass';

const Button = ({ children: label, linkTo, className, style }) => {
  const template = (
    <button style={style} className={`button ${className}`}>
      {label}
    </button>
  );
  if (linkTo) {
    return <Link to={linkTo}>{template}</Link>;
  }
  return template;
};

export default Button;
