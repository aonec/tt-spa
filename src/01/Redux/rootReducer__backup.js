import { combineReducers } from 'redux';
import counter1 from './reducers_backup/counter1';
import counter2 from './reducers_backup/counter2';

export function rootReducer() {
  combineReducers({
    counter1,
    counter2,
  });
}

export default rootReducer;
