import React from 'react';
import './style.sass';

const TopBanner = ({ title, descr, img }) => {
  return (
    <div className='top-banner' style={{ backgroundImage: `url(${img})` }}>
      <div className='top-banner__wrapper'>
        <h2 className='top-banner__title'>{title}</h2>
        <p className='top-banner__descr'>{descr}</p>
      </div>
    </div>
  );
};

export default TopBanner;
