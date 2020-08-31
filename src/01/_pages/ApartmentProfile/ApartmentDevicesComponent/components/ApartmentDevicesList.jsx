import React, { useContext } from 'react';
import { ApartmentDeviceItem } from './ApartmentDeviceItem';
import { ApartmentDevicesContext } from '../ApartmentDevices';

export function ApartmentDevicesList() {
  const ApartmentDevicesListContext = useContext(ApartmentDevicesContext);

  const DevicesList = ApartmentDevicesListContext.map((value, index) => {
    const {
      id, model, serialNumber, resource, futureCheckingDate,
    } = value;
    return (
      <ApartmentDeviceItem
        id={id}
        model={model}
        serialNumber={serialNumber}
        resource={resource}
        futureCheckingDate={futureCheckingDate}
      />
    );
  });

  return <>{DevicesList}</>;
}
export default ApartmentDevicesList;
