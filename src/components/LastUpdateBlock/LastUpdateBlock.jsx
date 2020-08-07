import React from 'react';
import './LastUpdateBlock.css';
import Moment from 'react-moment';

const LastUpdateBlock = ({ lastUpdate }) => {
  return (
    <div className='last-update-block'>
      <p>Last update (D/M/YYYY):</p>
      <Moment className='last-update-date' format='DD/MM/YYYY, LTS'>
        {lastUpdate}
      </Moment>
    </div>
  );
};

export default LastUpdateBlock;
