import React from 'react';
import './SpecificStatBlock.css';
import Odometer from 'react-odometerjs';

import { connect } from 'react-redux';
import { setChart } from '../../redux/charts/charts.actions';

const SpecificStatBlock = ({ label, color, value, setChart }) => {
  return (
    <div
      className='specific-stat-block'
      style={{ borderLeft: `5px solid ${color}`, color: color }}
    >
      <div className='info-column'>
        <label className='specific-stat-label'>{label} </label>
        <Odometer value={value} />
      </div>

      <div className='chart-btn' onClick={() => setChart({ label, color })}>
        <span className='chart-btn-text'>Ver gráfica </span>
        <i className='fa fa-line-chart chart-btn-ico' aria-hidden='true' />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setChart: (chart) => dispatch(setChart(chart)),
});

export default connect(null, mapDispatchToProps)(SpecificStatBlock);
