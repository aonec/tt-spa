import React, {useContext} from "react";
import './ApartmentDeviceItem.css'
import {ApartmentDevice} from "../ApartmentDevice";
import {ApartmentInput} from "../ApartmentInput";
import {ApartmentDevicesHistory} from '../ApartmentDevicesHistory'

import {ApartmentDevicesContext} from '../../ApartmentDevices'

export function ApartmentDeviceItem(props) {
  const ApartmentDevicesList = useContext(ApartmentDevicesContext);
  const currentDevice = {...ApartmentDevicesList[props.index]}
  const {model, serialNumber, resource} = currentDevice;
  console.log("props", props)
  console.log("currentDevice", currentDevice)

  return (
    <div className='appdev__item'>
      <ApartmentDevice
        model={model}
        serialNumber={serialNumber}
        resource = {resource}
      />
      <ApartmentInput/>
      <ApartmentInput/>
      <ApartmentDevicesHistory/>
    </div>
  )
}