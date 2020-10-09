import { combineReducers } from 'redux';

import calculatorReducer from './reducers/reducerCalc';
import deviceReducer from './reducers/reducerDev';
import reducerDevicesPage from './reducers/reducerDevicesPage';

export default combineReducers({
  deviceReducer,
  calculatorPage: calculatorReducer,
  devicePage: reducerDevicesPage,
});
