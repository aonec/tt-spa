import React from 'react';
import { individualMeteringDeviceProfileService } from './individualMeteringDeviceProfileService.models';
import { useUnit } from 'effector-react';
import { individualDeviceQuery } from './individualMeteringDeviceProfileService.api';
import { useParams } from 'react-router-dom';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { IndividualDeviceProfile } from './view/IndividualDeviceProfile';

const {
  gates: { IndividualDeviceGate },
} = individualMeteringDeviceProfileService;

export const IndividualMeteringDeviceProfileContainer = () => {
  const { id } = useParams<{ id: string }>();

  const { data: device, pending: isLoading } = useUnit(individualDeviceQuery);

  return (
    <>
      <IndividualDeviceGate id={Number(id)} />
      <WithLoader isLoading={isLoading}>
        {device && <IndividualDeviceProfile device={device} />}
      </WithLoader>
    </>
  );
};
