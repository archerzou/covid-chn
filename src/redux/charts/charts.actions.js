import chartsAT from './charts.actionTypes';
import axios from 'axios';

const getChartsStart = () => ({
  type: chartsAT.GET_CHARTS_START,
});

const getChartsSuccess = (dataArr) => ({
  type: chartsAT.GET_CHARTS_SUCCESS,
  payload: dataArr,
});

const getChartsFailure = (errorMsg) => ({
  type: chartsAT.GET_CHARTS_FAILURE,
  payload: errorMsg,
});

export const getCharts = (location) => async (dispatch) => {
  dispatch(getChartsStart());

  const today = new Date();
  const lastTenDays = [];

  const formatDate = (date) =>
    `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;

  for (let i = 10; i > 0; i--) {
    const getDate = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate() - i
    );
    lastTenDays.push(formatDate(getDate));
  }

  try {
    const getData = async (day) => {
      const response = await axios.get(
        `https://covid19.mathdro.id/api/daily/${day}`
      );
      return response.data.filter((t) => t.provinceState === location)[0];
    };

    const dataArr = await Promise.all(lastTenDays.map((day) => getData(day)));
    dispatch(getChartsSuccess(dataArr));
  } catch (error) {
    dispatch(getChartsFailure(error.message));
  }
};

export const setChart = (chart) => ({
  type: chartsAT.SET_CHART,
  payload: chart,
});
