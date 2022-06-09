import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { displayDevicesService } from './displayDevicesService.models';
import { DevicesList } from './view/DevicesList';

export const DevicesListContainer = () => {
  const { outputs, inputs } = displayDevicesService;

  const setPageNumber = useEvent(inputs.setPageNumber);

  const calculators = useStore(outputs.$calculators);
  const isLoading = useStore(outputs.$loading);

  const total = useStore(outputs.$total);
  const pageNumber = useStore(outputs.$pageNumber);
  const pageSize = useStore(outputs.$pageSize);

  return (
    <DevicesList
      calculators={calculators}
      isLoading={isLoading}
      total={total}
      pageNumber={pageNumber}
      pageSize={pageSize}
      setPageNumber={setPageNumber}
    />
  );
};
