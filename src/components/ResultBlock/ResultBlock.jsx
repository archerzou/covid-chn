import React from 'react';
import './ResultBlock.css';

import { connect } from 'react-redux';
import { setLocation } from '../../redux/stats/stats.actions';
import { createStructuredSelector } from 'reselect';
import { selectSpecificLocation } from '../../redux/stats/stats.selectors';

const ResultBlock = ({ specificLocation, setLocation, color, ...props }) => {
  const { value, provinceState } = props;
  const active = specificLocation === provinceState;
  return (
    <div
      className={`result-block ${active ? 'active-block' : ''}`}
      onClick={() => setLocation(provinceState)}
    >
      <span style={{ color: color }} className='result-num'>
        {value.toLocaleString()}
      </span>
      {provinceState}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  specificLocation: selectSpecificLocation,
});

const mapDispatchToProps = (dispatch) => ({
  setLocation: (location) => dispatch(setLocation(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultBlock);
