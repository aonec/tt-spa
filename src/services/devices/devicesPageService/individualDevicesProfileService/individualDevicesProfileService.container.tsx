import React from 'react';
import { useEvent, useStore } from 'effector-react';
import { individualDevicesProfileService } from './individualDevicesProfileService.model';
import { IndividualDevicesProfile } from './view/IndividualDevicesProfile';

const { inputs, outputs } = individualDevicesProfileService;

export const IndividualDevicesProfileContainer = () => {
  const devicesSearchType = useStore(outputs.$devicesSearchType);

  const setDevicesSearchType = useEvent(inputs.setDevicesSearchType);

  return (
    <IndividualDevicesProfile
      devicesSearchType={devicesSearchType}
      setDevicesSearchType={setDevicesSearchType}
    />
  );
};
