import { combineReducers } from 'redux'

import reducerDevicesPage from './reducers/reducerDevicesPage'
import objectReducer from './reducers/reducerObject'
import readingsReducer from './reducers/readingsReducer'

export default combineReducers({
    objectReducer,
    devicePage: reducerDevicesPage,
    readings: readingsReducer,
})
