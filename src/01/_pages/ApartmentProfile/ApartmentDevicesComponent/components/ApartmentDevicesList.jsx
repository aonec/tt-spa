import React, { useContext } from 'react';
import { ApartmentDeviceItem } from './ApartmentDeviceItem';
import { ApartmentDevicesContext } from '../ApartmentDevices';

export function ApartmentDevicesList() {
  const ApartmentDevicesListContext = useContext(ApartmentDevicesContext);

  const DevicesList = ApartmentDevicesListContext.map((value, index) => (
    <ApartmentDeviceItem index={index} />
  ));

  return <>{DevicesList}</>;
}
export default ApartmentDevicesList;
