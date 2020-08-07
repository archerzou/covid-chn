import React from 'react';
import './ResultsColumn.css';
import TotalBlock from '../TotalBlock/TotalBlock';
import ResultBlock from '../ResultBlock/ResultBlock';

const ResultsColumn = ({ large, array, total, label, color }) => {
  return (
    <div className={`results-column ${large ? 'large' : null}`}>
      <TotalBlock color={color} label={label} total={total} />
      <div className='results-container'>
        {array.map(({ uid, ...props }) => (
          <ResultBlock key={uid} {...props} color={color} />
        ))}
      </div>
    </div>
  );
};

export default ResultsColumn;
