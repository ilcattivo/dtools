import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './style.sass';

const EditSuccess = ({ label, className }) => {
  let classes = 'edit-success';
  if (className) classes += ` ${className}`;

  return (
    <p className={classes}>
      <CheckCircleIcon style={{ position: 'absolute', left: 0, top: '-2px' }} />
      {label}
    </p>
  );
};

export default EditSuccess;
