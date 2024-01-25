import { useUnit } from 'effector-react';
import React from 'react';
import { displayDevicesService } from './displayDevicesService.models';
import { DevicesList } from './view/DevicesList';
import { getNodesListQuery } from './displayDevicesService.api';

const { outputs, inputs } = displayDevicesService;

export const DevicesListContainer = () => {
  const {
    housingStocksAddressForSwitcher,
    housingStocksDevices,
    isLoading,
    mainFilterSearchType,
    pageNumber,
    pageSize,
    setAddressBySwither,
    setMainFilterSearchType,
    setPageNumber,
    total,
    isDevicesFetched,
  } = useUnit({
    housingStocksDevices: outputs.$devices,
    housingStocksAddressForSwitcher: outputs.$housingsByFilter,
    isLoading: outputs.$loading,
    total: outputs.$total,
    pageNumber: outputs.$pageNumber,
    pageSize: outputs.$pageSize,
    mainFilterSearchType: outputs.$devicesSearchType,
    setMainFilterSearchType: inputs.setDevicesSearchType,
    setPageNumber: inputs.setPageNumber,
    setAddressBySwither: inputs.setDevicesProfileFilter,
    isDevicesFetched: getNodesListQuery.$succeeded,
  });

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
      isDevicesFetched={isDevicesFetched}
    />
  );
};
