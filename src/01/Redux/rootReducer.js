import { combineReducers } from 'redux';

import reducerCalc from './reducers/reducerCalc';
import reducerDev from './reducers/reducerDev';
import reducerEditDevice from './reducers/reducerEditDevice';
import calc from '01/_pages/ObjectProfile/components/AddCalculator/store/reducer';

export default combineReducers({
  reducerCalc,
  reducerDev,
  reducerEditDevice,
  calc
});
