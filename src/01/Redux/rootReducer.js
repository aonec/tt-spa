import { combineReducers } from 'redux';

import calculatorReducer from './reducers/reducerCalc';
import deviceReducer from './reducers/reducerDev';
import reducerDevicesPage from './reducers/reducerDevicesPage';
import deviceDeregisterReducer from './reducers/reducerDeviceDeregister';
import objectReducer from './reducers/reducerObject';
import changeOdpuReducer from './reducers/reducerChangeOdpu';
import calcReportDeregisterReducer from './reducers/reducerCalcReport';
import modalsReducer from "./reducers/reducerModals";

export default combineReducers({
  calcReportDeregisterReducer,
  deviceReducer,
  objectReducer,
  calculatorPage: calculatorReducer,
  devicePage: reducerDevicesPage,
  deviceDeregisterReducer,
  changeOdpuReducer,
  modalsReducer
});
