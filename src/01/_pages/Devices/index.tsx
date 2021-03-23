import React from 'react'
import TabsDevices from './components/TabsDevices'
import { useSelector } from 'react-redux'
import {RootState} from "../../Redux/store";
import {DevicePageType} from "../../Redux/rootReducer";

export const DevicesFromSearch = () => {
  const devicePage = useSelector<RootState, DevicePageType>
  ((state) => state.devicePage);
  debugger;
  return (
    <div>
      <h1 style={{ fontWeight: 300, marginBottom: 16 }}>Приборы</h1>
      <TabsDevices devicePage={devicePage} />
    </div>
  )
}

export default DevicesFromSearch
