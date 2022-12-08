import React from 'react';
import { CommonInfo } from './view/CommonInfo';
import { ConnectionSettings } from './view/ConnectionSettings';
import { Documents } from './view/Documents';

export const HousingMeteringDeviceProfileContainer = () => {
  return (
    <>

    
      {<CommonInfo />}
      {<ConnectionSettings />}
      {<Documents />}
    </>
  );
};
