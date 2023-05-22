import React, { FC } from 'react';
import { Wrapper } from './IndividualDevicesSealListItem.styled';
import { IndividualDevicesSealListItemProps } from './IndividualDevicesSealListItem.types';
import { IndividualDeviceInfoExtended } from 'ui-kit/shared_components/IndividualDeviceInfoExtended';

export const IndividualDevicesSealListItem: FC<
  IndividualDevicesSealListItemProps
> = ({ device }) => {
  return (
    <Wrapper>
      <IndividualDeviceInfoExtended device={device} />
    </Wrapper>
  );
};
