import React, { FC } from 'react';
import {
  SealDateWrapper,
  SealNumberWrapper,
  Wrapper,
} from './IndividualDevicesSealListItem.styled';
import { IndividualDevicesSealListItemProps } from './IndividualDevicesSealListItem.types';
import { IndividualDeviceInfoExtended } from 'ui-kit/shared/IndividualDeviceInfoExtended';
import dayjs from 'api/dayjs';

export const IndividualDevicesSealListItem: FC<
  IndividualDevicesSealListItemProps
> = ({ device }) => {
  const formatedDate = dayjs(device.sealInstallationDate).format('DD.MM.YYYY');

  return (
    <Wrapper>
      <IndividualDeviceInfoExtended device={device} />
      <div>
        <SealNumberWrapper>{device.sealNumber}</SealNumberWrapper>
        <SealDateWrapper>
          {device.sealInstallationDate && formatedDate}
        </SealDateWrapper>
      </div>
    </Wrapper>
  );
};
