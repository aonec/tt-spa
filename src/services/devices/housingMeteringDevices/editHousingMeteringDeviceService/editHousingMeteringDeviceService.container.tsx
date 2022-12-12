import React from 'react';
import { EditHousingMeteringDeviceCommonInfo } from './view/EditHousingMeteringDevicePage/Tabs/EditHousingMeteringDeviceCommonInfo';
import { EditHousingMeteringDeviceDocuments } from './view/EditHousingMeteringDevicePage/Tabs/EditHousingMeteringDeviceDocuments';

export const EditHousingMeteringDeviceContainer = () => {
  return (
    <>
      <EditHousingMeteringDeviceCommonInfo />
      <EditHousingMeteringDeviceDocuments />
    </>
  );
};
