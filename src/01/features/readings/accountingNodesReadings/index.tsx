import { Space } from '01/shared/ui/Layout/Space/Space';
import { useStore } from 'effector-react';
import React from 'react';
import { ConfirmReadingValueModal } from '../readingsInput/confirmInputReadingModal';
import { AccountingNodesFilter } from './components/Filter';
import { MeteringDevicesList } from './components/MeteringDevicesList';
import { meteringDeviceReadingsService } from './components/MeteringDevicesList/meteringDevicesListService.model';

export const AccountingNodesReadings = () => {
  return (
    <>
      <ConfirmReadingValueModal />
      <AccountingNodesFilter />
      <Space />
      <MeteringDevicesList />
    </>
  );
};
