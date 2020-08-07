import chartsAT from './charts.actionTypes';

const INITIAL_STATE = {
  arr: null,
  chart: { label: 'Confirmed', color: '#fe2121' },
  loading: false,
  error: undefined,
};

const chartsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case chartsAT.GET_CHARTS_START:
      return {
        ...state,
        loading: true,
      };

    case chartsAT.GET_CHARTS_SUCCESS:
      return {
        ...state,
        arr: payload,
        loading: false,
      };

    case chartsAT.GET_CHARTS_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case chartsAT.SET_CHART:
      return {
        ...state,
        chart: payload,
      };

    default:
      return state;
  }
};

export default chartsReducer;
