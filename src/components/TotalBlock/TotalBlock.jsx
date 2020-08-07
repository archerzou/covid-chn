import React from 'react';
import './TotalBlock.css';

const TotalBlock = ({ color, label, total }) => {
  return (
    <div className='total-block'>
      <h3>{`Total ${label}`}</h3>
      <h1 style={{ color: color }} className='total-num'>
        {total.toLocaleString()}
      </h1>
    </div>
  );
};

export default TotalBlock;
