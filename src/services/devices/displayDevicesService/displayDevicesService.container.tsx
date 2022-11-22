import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { displayDevicesService } from './displayDevicesService.models';
import { DevicesList } from './view/DevicesList';

export const DevicesListContainer = () => {
  const { outputs, inputs } = displayDevicesService;

  const devices = useStore(outputs.$devices);
  const housingsByFilter = useStore(outputs.$housingsByFilter);

  const isLoading = useStore(outputs.$loading);
  const total = useStore(outputs.$total);
  const pageNumber = useStore(outputs.$pageNumber);
  const pageSize = useStore(outputs.$pageSize);
  const devicesSearchType = useStore(outputs.$devicesSearchType);

  const setDevicesSearchType = useEvent(inputs.setDevicesSearchType);
  const setPageNumber = useEvent(inputs.setPageNumber);
  const setAddress = useEvent(inputs.setDevicesProfileFilter);

  return (
    <DevicesList
      devices={devices}
      isLoading={isLoading}
      total={total}
      pageNumber={pageNumber}
      pageSize={pageSize}
      setPageNumber={setPageNumber}
      setAddress={setAddress}
      housingsByFilter={housingsByFilter}
      setDevicesSearchType={setDevicesSearchType}
      devicesSearchType={devicesSearchType}
    />
  );
};
