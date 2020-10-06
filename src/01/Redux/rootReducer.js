import { combineReducers } from 'redux';

import reducerCalc from './reducers/reducerCalc';
import reducerDev from './reducers/reducerDev';
import reducerDevicesPage from "./reducers/reducerDevicesPage";

export default combineReducers({
  reducerCalc,
  reducerDev,
  devicePage: reducerDevicesPage
});