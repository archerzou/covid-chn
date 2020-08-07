import { createSelector } from 'reselect';

const selectCharts = (state) => state.charts;

export const selectAreChartsLoading = createSelector(
  [selectCharts],
  (charts) => charts.loading
);

export const selectChartsData = createSelector([selectCharts], (charts) =>
  charts.arr ? charts.arr : null
);

export const selectChartToDisplay = createSelector(
  [selectCharts],
  (charts) => charts.chart
);
