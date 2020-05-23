import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.sass';

const Thumbs = ({ files, onRemove }) => {
  const thumbs = files.map((file) => {
    const loading = !file.loaded;
    const imgClasses = loading ? 'img img__loading' : 'img';
    const spinnerClasses = loading ? 'spinner' : 'spinner hidden';

    return (
      <div key={file.name} className='thumb'>
        <div className='thumb__inner'>
          <img src={file.preview} className={imgClasses} alt={file.name} />
          <CircularProgress className={spinnerClasses} />
          <button
            disabled={loading}
            className='thumb__delete'
            onClick={(e) => onRemove(e, file)}></button>
        </div>
      </div>
    );
  });

  return <aside className='thumb-bar'>{thumbs}</aside>;
};

export default Thumbs;
