import React from 'react';
import './CustomSelector.css';

const CustomSelector = ({ options, setLocation, value }) => {
  return (
    <select
      className='custom-selector'
      onChange={(e) => setLocation(e.target.value)}
      value={value}
    >
      {options
        ? options.map(({ id, name }) => (
            <option key={id} value={name} className='custom-selector-option'>
              {name}
            </option>
          ))
        : null}
    </select>
  );
};

export default CustomSelector;
