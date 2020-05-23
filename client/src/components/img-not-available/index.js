import React from 'react';
import './style.sass';

const ImgNotAvailable = ({ className, fontSize }) => {
  return (
    <div className={`img-not-available ${className}`}>
      <div
        className='img-not-available__text'
        style={{
          fontSize: fontSize || '2rem',
        }}>
        Отсутствует
        <br />
        изображение
      </div>
    </div>
  );
};

export default ImgNotAvailable;
