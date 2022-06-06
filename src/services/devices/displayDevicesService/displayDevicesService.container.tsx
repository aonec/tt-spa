import { useStore } from 'effector-react';
import React from 'react';
import { displayDevicesService } from './displayDevicesService.models';
import { DevicesList } from './view/DevicesList';

export const DevicesListContainer = () => {
  const { outputs } = displayDevicesService;

  const calculators = useStore(outputs.$calculators);
  const isLoading = useStore(outputs.$loading);
  
  return <DevicesList calculators={calculators} isLoading={isLoading} />;
};
