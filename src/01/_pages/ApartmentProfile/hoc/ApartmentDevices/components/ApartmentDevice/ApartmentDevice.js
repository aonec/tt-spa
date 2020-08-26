import React, {useContext} from 'react';
import './ApartmentDevice.css';
import 'icomoon/style.css';
import {ApartmentDevicesContext} from "../../ApartmentDevices";

export function ApartmentDevice(props) {

  const ApartmentDevicesList = useContext(ApartmentDevicesContext);
  console.log(ApartmentDevicesList);
  const {model,serialNumber, resource} = props;

  let icon;
  if (resource == "HotWaterSupply") {
    icon = 'icon-HotWaterSupply'
  }
  if (resource =="ColdWaterSupply") {
    icon = "icon-drop"
  }
  if (resource == "Electricity") {
    icon="icon-electricity"
  }

  return (
    <div className='wrap'>
      <div className='top'>
        <div className={icon}></div>
        <h2 className='name'>{model}</h2>
        <p className='number'>{serialNumber}</p>
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

