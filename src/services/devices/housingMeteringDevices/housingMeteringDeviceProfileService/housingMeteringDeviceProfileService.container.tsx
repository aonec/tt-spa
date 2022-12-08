import React from 'react';
import { useParams } from 'react-router-dom';
import { housingMeteringDeviceProfileService } from './housingMeteringDeviceProfileService.model';
import { HousingMeteringDeviceProfile } from './view/HousingMeteringDeviceProfile';

const { inputs, outputs, gates } = housingMeteringDeviceProfileService;
const { FetchHousingMeteringDeviceGate } = gates;

export const HousingMeteringDeviceProfileContainer = () => {
  const { deviceId } = useParams<{ deviceId: string }>();

  return (
    <>
      <FetchHousingMeteringDeviceGate deviceId={deviceId} />
      <HousingMeteringDeviceProfile deviceId={deviceId} />
    </>
  );
};
