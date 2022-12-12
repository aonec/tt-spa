import React from 'react';
import { useEvent, useStore } from 'effector-react';
import { individualDevicesProfileService } from './individualDevicesProfileService.model';
import { IndividualDevicesProfile } from './view/IndividualDevicesProfile';

const { inputs, outputs, gates } = individualDevicesProfileService;
const { IndividualDevicesGate } = gates;

export const IndividualDevicesProfileContainer = () => {
  const devicesSearchType = useStore(outputs.$devicesSearchType);

  const setDevicesSearchType = useEvent(inputs.setDevicesSearchType);

  return (
    <>
      <IndividualDevicesGate />
      <IndividualDevicesProfile
        devicesSearchType={devicesSearchType}
        setDevicesSearchType={setDevicesSearchType}
      />
    </>
  );
};
