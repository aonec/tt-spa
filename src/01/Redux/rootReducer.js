import { combineReducers } from 'redux';

import editCalculatorReducer from '01/_pages/EditDevice/store/reducerEditCalculator'
import calculatorReducer from '01/_pages/ObjectProfile/components/store/reducer';
import reducerDevicesPage from './reducers/reducerDevicesPage';
import deviceReducer from '01/_pages/ObjectProfile/components/store/reducerAddDevice';

export default combineReducers({
  editCalculatorReducer,
  deviceReducer,
  calculatorPage: calculatorReducer,
  devicePage: reducerDevicesPage,
});
