import { combineReducers } from 'redux';

import calculatorReducer from '01/_pages/ObjectProfile/components/store/reducer';
import reducerDev from './reducers/reducerDev';
import reducerDevicesPage from './reducers/reducerDevicesPage';

export default combineReducers({
  reducerDev,
  calculatorPage: calculatorReducer,
  devicePage: reducerDevicesPage,
});
