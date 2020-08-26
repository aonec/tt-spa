import React from "react";
import './ApartmentDeviceItem.css'
import {ApartmentDevice} from "../ApartmentDevice";
import {ApartmentInput} from "../ApartmentInput";
import {ApartmentDevicesHistory} from '../ApartmentDevicesHistory'

export function ApartmentDeviceItem() {
  return (
    <div className='appdev__item'>
      <div><ApartmentDevice /></div>
      <div><ApartmentInput /></div>
      <div><ApartmentInput /></div>
      <div><ApartmentDevicesHistory/></div>
    </div>
  )
}