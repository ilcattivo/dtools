import React from 'react';
import './style.sass';

const EditFailure = ({ label, className }) => {
  let classes = 'edit-failure';
  if (className) classes += ` ${className}`;

  return <p className='edit-failure'>{label}</p>;
};

export default EditFailure;
