import { combineReducers } from 'redux'

import calculatorReducer from './reducers/reducerCalc'
import deviceReducer from './reducers/reducerDev'
import reducerDevicesPage from './reducers/reducerDevicesPage'
import deviceDeregisterReducer from './reducers/reducerDeviceDeregister'
import objectReducer from './reducers/reducerObject'
import changeOdpuReducer from './reducers/reducerChangeOdpu'
import calcReportReducer from './reducers/reducerCalcReport'
import readingsReducer from './reducers/readingsReducer'

export default combineReducers({
    calcReportReducer,
    deviceReducer,
    objectReducer,
    calculatorPage: calculatorReducer,
    devicePage: reducerDevicesPage,
    deviceDeregisterReducer,
    changeOdpuReducer,
    readings: readingsReducer,
})
