import React, { useContext } from 'react';
import { ApartmentDeviceItem } from './ApartmentDeviceItem';
import { ApartmentDevicesContext } from '../ApartmentDevices';
import ClosedDevices from '../../../../shared/ui/devices/ClosedDevices';

export function ApartmentDevicesList({ sliderIndex }) {
  const devices = useContext(ApartmentDevicesContext);

  // const closedDevices = devices.filter(
  //   ({ closingDate }) => closingDate !== null
  // );

  if (!devices) return null;

  const filteredDevices = devices.reduce(
    (acc, device) => {
      if (device.closingDate === null) {
        return { ...acc, validDevices: [...acc.validDevices, device] };
      }
      return { ...acc, closedDevices: [...acc.closedDevices, device] };
    },
    { validDevices: [], closedDevices: [] },
  );

  const validDeviceElems = filteredDevices.validDevices
    .filter(({ closingDate }) => closingDate === null)
    .map((device) => (
      <ApartmentDeviceItem device={device} sliderIndex={sliderIndex} />
    ));

  return (
    <>
      {validDeviceElems}
      <ClosedDevices devices={filteredDevices.closedDevices} />
    </>
  );
}
export default ApartmentDevicesList;
