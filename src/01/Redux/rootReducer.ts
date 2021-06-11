import { combineReducers } from 'redux';
import reducerDevicesPage from './reducers/reducerDevicesPage';
import objectReducer from './reducers/reducerObject';
import readingsReducer from './reducers/readingsReducer';
import userReducer from './reducers/userReducer';
import { CalculatorListResponsePagedList } from '../../myApi';
import groupReportReducer from '../features/groupReport/models/groupReportReducer';

export default combineReducers({
  objectReducer,
  devicePage: reducerDevicesPage,
  readings: readingsReducer,
  user: userReducer,
  groupReport: groupReportReducer,
});

export type DevicePageType = CalculatorListResponsePagedList & {
  isLoading: boolean;
  currentPage: number;
};
