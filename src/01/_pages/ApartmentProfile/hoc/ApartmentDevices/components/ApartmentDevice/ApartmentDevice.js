import React, {useContext} from 'react';
import './ApartmentDevice.css';
import 'icomoon/style.css';
import {ApartmentDevicesContext} from "../../ApartmentDevices";

export function ApartmentDevice(props) {

  const ApartmentDevicesList = useContext(ApartmentDevicesContext);
  console.log(ApartmentDevicesList);

  const device = {...ApartmentDevicesList[0]};
  console.log(device)
  return (
    <div className='wrap'>
      <div className='top'>
        <div className='icon-drop'></div>
        <h2 className='name'>{props.model}</h2>
        <p className='number'>{props.serialNumber}</p>
      </div>
      <div className='bottom'>
        <div className='icon-green'></div>
        <h4 className='state'>Активен</h4>
        <p className='dates'>01.09.2017 — 01.09.2024</p>
        <p className='place'>Туалет</p>
      </div>
    </div>
  )
}

