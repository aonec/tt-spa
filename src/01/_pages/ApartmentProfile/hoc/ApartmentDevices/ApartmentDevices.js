import React from 'react';
import {Header} from "./components/Header";
import {ApartmentDevicesList} from './components/ApartmentDevicesList'

import {ShowHidden} from "./components/ShowHidden";

export const ApartmentDevices = () => {

  return (
    <>
      <Header/>
      <ApartmentDevicesList/>
      <ShowHidden />

    </>
  )
}