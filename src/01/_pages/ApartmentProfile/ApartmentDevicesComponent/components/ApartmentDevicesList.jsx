import React, { useContext } from 'react';
import { ApartmentDeviceItem } from './ApartmentDeviceItem';
import { ApartmentDevicesContext } from '../ApartmentDevices';
import ClosedDevices from '../../../../shared/ui/devices/ClosedDevices';

export function ApartmentDevicesList({ sliderIndex }) {
  const devices = useContext(ApartmentDevicesContext);

  const validDevices = devices
    .filter((device) => device.closingDate === null)
    .map((device) => (
      <ApartmentDeviceItem device={device} sliderIndex={sliderIndex} />
    ));

  const closedDevices = devices.filter((device) => device.closingDate !== null);

  return (
    <>
      {validDevices}
      <ClosedDevices devices={closedDevices} />
    </>
  );
}
export default ApartmentDevicesList;
