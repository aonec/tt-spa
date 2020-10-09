import { combineReducers } from 'redux';

import calculatorReducer from './reducers/reducerCalc';
import reducerDevicesPage from './reducers/reducerDevicesPage';
import deviceReducer from '01/_pages/ObjectProfile/components/store/reducerAddDevice';

export default combineReducers({
  deviceReducer,
  calculatorPage: calculatorReducer,
  devicePage: reducerDevicesPage,
});
