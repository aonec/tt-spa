import React, { FC } from 'react';
import { DeviceStatus } from 'ui-kit/shared_components/IndividualDeviceInfo/DeviceStatus';
import { Wrapper } from './ConnectionSettings.styled';
import { ConnectionSettingsProps } from './ConnectionSettings.types';

export const ConnectionSettings: FC<ConnectionSettingsProps> = ({
  hubConnection,
}) => {
  console.log(hubConnection);

  // const isActive = hubConnection

  return (
    <Wrapper>
      {/* //   <ModelBlock></ModelBlock> */}
      {/* //   {isActive && <DeviceStatus isActive={isActive} />} */}
    </Wrapper>
  );
};
