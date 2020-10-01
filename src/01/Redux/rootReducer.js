import { combineReducers } from 'redux';

import counter1 from './reducers/counter1';
import counter2 from './reducers/counter2';
import reducerCalc from './reducers/reducerCalc';
import reducerDev from './reducers/reducerDev';

export default combineReducers({
  counter1,
  counter2,
  reducerCalc,
  reducerDev,
});
