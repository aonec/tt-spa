import React from 'react';
import {ApartmentDevice} from './components/ApartmentDevice'
import {ApartmentInput} from './components/ApartmentInput'
import {Header} from "./components/Header";
import {ApartmentDeviceItem} from './components/ApartmentDeviceItem'

export const ApartmentDevices = () => {
  return (
    <>
      <Header/>
      <ApartmentDeviceItem/>
      <ApartmentDeviceItem/>
      <ApartmentDeviceItem/>
    </>
  )
}