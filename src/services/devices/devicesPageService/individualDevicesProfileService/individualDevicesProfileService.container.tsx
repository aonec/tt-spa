import React, { FC } from 'react';
import { useUnit } from 'effector-react';
import { individualDevicesProfileService } from './individualDevicesProfileService.model';
import { IndividualDevicesProfile } from './view/IndividualDevicesProfile';
import { HeaderInject } from 'services/objects/objectsProfileService/view/ObjectsProfile/ObjectsProfile.types';

const { inputs, outputs, gates } = individualDevicesProfileService;
const { IndividualDevicesGate } = gates;

export const IndividualDevicesProfileContainer: FC<HeaderInject> = ({
  Header,
}) => {
  const { devicesSearchType, setDevicesSearchType } = useUnit({
    devicesSearchType: outputs.$devicesSearchType,
    setDevicesSearchType: inputs.setDevicesSearchType,
  });

  return (
    <>
      <IndividualDevicesGate />
      <IndividualDevicesProfile
        devicesSearchType={devicesSearchType}
        setDevicesSearchType={setDevicesSearchType}
        Header={Header}
      />
    </>
  );
};
