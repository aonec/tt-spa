import { combineReducers } from 'redux';

import calc from '01/_pages/ObjectProfile/components/AddCalculator/store/reducer';
import reducerCalc from './reducers/reducerCalc';
import reducerDev from './reducers/reducerDev';
import reducerDevicesPage from './reducers/reducerDevicesPage';

export default combineReducers({
  // reducerCalc,
  reducerDev,
  calc,
  devicePage: reducerDevicesPage,
});
