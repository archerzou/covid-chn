import React from 'react';
import './SpinnerBackground.css';

const SpinnerBackground = ({ bgColor }) => {
  return (
    <div className='spinner-bg' style={{ background: bgColor }}>
      <div className='spinner' />
    </div>
  );
};

export default SpinnerBackground;
