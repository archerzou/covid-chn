import { combineReducers } from 'redux';
import stats from './stats/stats.reducer';
import charts from './charts/charts.reducer';

const rootReducer = combineReducers({ stats, charts });

export default rootReducer;
