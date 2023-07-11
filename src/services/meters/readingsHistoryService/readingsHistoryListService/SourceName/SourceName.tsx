import React from 'react';
import {
  EIndividualDeviceReadingsSource,
  OrganizationUserShortResponse,
} from 'myApi';
import { Wrapper } from './SourceName.styled';
import { getSourceIcon, getSourceName } from '../../../../../utils/sourceIcon';

export const SourceName = ({
  sourceType,
  user,
}: {
  sourceType: EIndividualDeviceReadingsSource;
  user?: OrganizationUserShortResponse | null;
}) => {
  const userName = user?.name;

  const icon = getSourceIcon(sourceType);
  const name = getSourceName(sourceType, userName);

  return (
    <Wrapper>
      {icon}
      {name}
    </Wrapper>
  );
};
