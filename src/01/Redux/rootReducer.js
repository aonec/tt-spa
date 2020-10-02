import { combineReducers } from 'redux';

import reducerCalc from './reducers/reducerCalc';
import reducerDev from './reducers/reducerDev';

export default combineReducers({
  reducerCalc,
  reducerDev,
});
