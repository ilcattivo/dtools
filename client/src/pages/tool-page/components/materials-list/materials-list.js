import React from 'react';
import { materialsList } from '../../../../utils/misc';
import './style.sass';

const MaterialsList = ({ list }) => {
  return (
    <ul className='materials-list'>
      {list.map((material) => {
        const materialData = materialsList.find((el) => el.abbr === material);
        const { abbr, label, color } = materialData;

        return (
          <li className='materials-list__item' key={abbr}>
            <span
              className='materials-list__pict'
              style={{
                backgroundColor: color,
              }}>
              {abbr}
            </span>
            <span className='materials-list__label'>{label}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default MaterialsList;
