import React, { FC } from 'react';
import { ActDate, Wrapper } from './ActsListItem.styled';
import { ActsListItemProps } from './ActsListItem.types';
import moment from 'moment';
import { ActTypesNamesLookup } from 'dictionaries';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';

export const ActsListItem: FC<ActsListItemProps> = ({ act }) => {
  const actAddress = getApartmentFromFullAddress(act.apartment, false);

  return (
    <Wrapper>
      <ActDate>{moment(act.actDateTime).format('DD.MM.YYYY')}</ActDate>
      <div>{act.registryNumber}</div>
      <div>{ActTypesNamesLookup[act.actType]}</div>
      <ResourceInfo resource={act.actResourceType} />
      <div>{actAddress}</div>
      <div>{moment(act.actJobDate).format('DD.MM.YYYY')}</div>
    </Wrapper>
  );
};
