import { Space } from '01/shared/ui/Layout/Space/Space';
import React from 'react';
import { AccountingNodesFilter } from './components/Filter';
import { MeteringDevicesList } from './components/MeteringDevicesList';

export const AccountingNodesReadings = () => {
  return (
    <>
      <AccountingNodesFilter />
      <Space />
      <MeteringDevicesList />
    </>
  );
};
