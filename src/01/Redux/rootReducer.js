import { combineReducers } from 'redux';

import reducerCalc from './reducers/reducerCalc';
import reducerDev from './reducers/reducerDev';
import reducerEditDevice from './reducers/reducerEditDevice';

export default combineReducers({
  reducerCalc,
  reducerDev,
  reducerEditDevice,
});
