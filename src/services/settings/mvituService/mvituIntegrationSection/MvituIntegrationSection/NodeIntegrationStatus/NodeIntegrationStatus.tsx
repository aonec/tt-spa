import React, { FC } from 'react';
import { Wrapper } from './NodeIntegrationStatus.styled';
import { Props } from './NodeIntegrationStatus.types';
import {
  NodeIntegrationStatusIconsLookup,
  NodeIntegrationStatusNamesLookup,
} from './NodeIntegrationStatus.constants';

export const NodeIntegrationStatus: FC<Props> = ({ status }) => {
  return (
    <Wrapper>
      {NodeIntegrationStatusIconsLookup[status]}
      {NodeIntegrationStatusNamesLookup[status]}
    </Wrapper>
  );
};
