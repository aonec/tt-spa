import React, { useContext } from 'react';
import { ApartmentDeviceItem } from './ApartmentDeviceItem';
import { ApartmentDevicesContext } from '../ApartmentDevices';

export function ApartmentDevicesList({ sliderIndex, showClosed }) {
  const devices = useContext(ApartmentDevicesContext);

  if (!devices) return null;

  const validDeviceElems = devices
    ?.filter((elem) => (!showClosed ? elem.closingDate === null : true))
    .map((device) => (
      <ApartmentDeviceItem device={device} sliderIndex={sliderIndex} />
    ));

  return <>{validDeviceElems}</>;
}
export default ApartmentDevicesList;
