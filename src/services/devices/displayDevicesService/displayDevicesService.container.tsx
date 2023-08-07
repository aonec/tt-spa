import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { displayDevicesService } from './displayDevicesService.models';
import { DevicesList } from './view/DevicesList';

const { outputs, inputs } = displayDevicesService;

export const DevicesListContainer = () => {
  const housingStocksDevices = useStore(outputs.$devices);
  const housingStocksAddressForSwitcher = useStore(outputs.$housingsByFilter);

  const isLoading = useStore(outputs.$loading);
  const total = useStore(outputs.$total);
  const pageNumber = useStore(outputs.$pageNumber);
  const pageSize = useStore(outputs.$pageSize);
  const mainFilterSearchType = useStore(outputs.$devicesSearchType);

  const setMainFilterSearchType = useEvent(inputs.setDevicesSearchType);
  const setPageNumber = useEvent(inputs.setPageNumber);
  const setAddressBySwither = useEvent(inputs.setDevicesProfileFilter);

  return (
    <DevicesList
      housingStocksDevices={housingStocksDevices}
      isLoading={isLoading}
      total={total}
      pageNumber={pageNumber}
      pageSize={pageSize}
      setPageNumber={setPageNumber}
      setAddressBySwither={setAddressBySwither}
      housingStocksAddressForSwitcher={housingStocksAddressForSwitcher}
      mainFilterSearchType={mainFilterSearchType}
      setMainFilterSearchType={setMainFilterSearchType}
  
    />
  );
};
