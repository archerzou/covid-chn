import React, { useEffect, useCallback, Fragment } from 'react';
import './Rechart.css';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import SpinnerBackground from '../SpinnerBackground/SpinnerBackground';

import { connect } from 'react-redux';
import { getCharts } from '../../redux/charts/charts.actions';
import { createStructuredSelector } from 'reselect';
import {
  selectChartsData,
  selectAreChartsLoading,
  selectChartToDisplay,
} from '../../redux/charts/charts.selectors';
import { selectSpecificLocation } from '../../redux/stats/stats.selectors';

const Rechart = ({
  areChartsLoading,
  chartsData,
  getCharts,
  specificLocation,
  chartToDisplay,
}) => {
  useEffect(() => {
    getCharts(specificLocation);
  }, [getCharts, specificLocation]);

  const { label, color } = chartToDisplay;

  const getData = useCallback(() => {
    const data = [];

    const monthsArr = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];

    const formatDate = (date) =>
      `${monthsArr[date.getMonth()]}-${date.getDate()}`;

    if (chartsData) {
      chartsData.forEach((element) => {
        const lastUpdate = new Date(element.lastUpdate);
        const date = formatDate(lastUpdate);

        switch (label) {
          case 'Confirmed':
            data.push({ date, value: element.confirmed });
            break;

          case 'Death':
            data.push({ date, value: element.deaths });
            break;

          case 'Recovered':
            data.push({ date, value: element.recovered });
            break;

          case 'Active':
            data.push({ date, value: element.active });
            break;

          default:
            break;
        }
      });
    }
    return data;
  }, [chartsData, label]);

  const CustomTooltip = ({ payload, label, active }) =>
    active ? (
      <div className='custom-tooltip' style={{ background: color }}>
        <p>{label}</p>
        <p className='cases-label'>{`Accumulator: ${Number(
          payload[0].value
        ).toLocaleString()}`}</p>
      </div>
    ) : null;

  return (
    <div className='chart-box'>
      {areChartsLoading ? (
        <SpinnerBackground bgColor='var(--light-grey)' />
      ) : (
        <Fragment>
          <h4 className='chart-title'>
            {specificLocation}
            {' - '}
            <span style={{ color: color }} className='chart-label'>
              {label}
            </span>
          </h4>
          <LineChart
            width={430}
            height={260}
            data={getData()}
            margin={{ bottom: -5, left: -5 }}
          >
            <Line type='monotone' dataKey='value' stroke={color} />
            <CartesianGrid stroke='var(--bright-grey)' strokeDasharray='3' />
            <XAxis dataKey='date' padding={{ left: 30, right: 30 }} />
            <YAxis
              domain={['dataMin', 'dataMax']}
              padding={{ top: 30, bottom: 30 }}
            />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  areChartsLoading: selectAreChartsLoading,
  chartsData: selectChartsData,
  specificLocation: selectSpecificLocation,
  chartToDisplay: selectChartToDisplay,
});

const mapDispatchToProps = (dispatch) => ({
  getCharts: (location) => dispatch(getCharts(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rechart);
