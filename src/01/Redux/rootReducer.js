import { combineReducers } from 'redux';

import calculatorReducer from './reducers/reducerCalc';
import deviceReducer from './reducers/reducerDev';
import reducerDevicesPage from './reducers/reducerDevicesPage';
import deviceDeregisterReducer from './reducers/reducerDeviceDeregister';
import objectReducer from './reducers/reducerObject';

export default combineReducers({
  deviceReducer,
  objectReducer,
  calculatorPage: calculatorReducer,
  devicePage: reducerDevicesPage,
  deviceDeregisterReducer,
});
