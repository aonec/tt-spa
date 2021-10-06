import React, { useContext } from 'react';
import { ApartmentDeviceItem } from './ApartmentDeviceItem';
import { ApartmentDevicesContext } from '../ApartmentDevices';

export function ApartmentDevicesList({ sliderIndex }) {
  const devices = useContext(ApartmentDevicesContext);

  if (!devices) return null;

  const validDeviceElems = devices.map((device) => (
    <ApartmentDeviceItem device={device} sliderIndex={sliderIndex} />
  ));

  return <>{validDeviceElems}</>;
}
export default ApartmentDevicesList;
