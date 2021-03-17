import { combineReducers } from 'redux'

import reducerDevicesPage from './reducers/reducerDevicesPage'
import objectReducer from './reducers/reducerObject'
import readingsReducer from './reducers/readingsReducer'
import userReducer from './reducers/userReducer'

export default combineReducers({
    objectReducer,
    devicePage: reducerDevicesPage,
    readings: readingsReducer,
    user: userReducer
})
