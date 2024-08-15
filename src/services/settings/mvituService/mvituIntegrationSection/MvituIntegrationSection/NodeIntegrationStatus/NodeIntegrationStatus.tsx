import React, { FC } from 'react';
import { Wrapper } from './NodeIntegrationStatus.styled';
import { Props } from './NodeIntegrationStatus.types';
import { NodeIntegrationStatusNamesLookup } from './NodeIntegrationStatus.constants';

export const NodeIntegrationStatus: FC<Props> = ({ status }) => {
  return <Wrapper>{NodeIntegrationStatusNamesLookup[status]}</Wrapper>;
};
