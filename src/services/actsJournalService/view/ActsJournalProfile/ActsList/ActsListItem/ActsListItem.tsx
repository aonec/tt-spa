import React, { FC } from 'react';
import { ActAddress, ActDate, Wrapper } from './ActsListItem.styled';
import { ActsListItemProps } from './ActsListItem.types';
import dayjs from 'api/dayjs';
import { ActTypesNamesLookup } from 'dictionaries';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';

export const ActsListItem: FC<ActsListItemProps> = ({ act }) => {
  const actAddress = getApartmentFromFullAddress(act.apartment, false);

  return (
    <Wrapper>
      <ActDate>{dayjs(act.actDateTime).format('DD.MM.YYYY')}</ActDate>
      <div>{act.registryNumber}</div>
      <div>{ActTypesNamesLookup[act.actType]}</div>
      <ResourceInfo resource={act.actResourceType} />
      {act.apartment?.apartmentId && (
        <ActAddress to={`/meters/apartments/${act.apartment.apartmentId}`}>
          {actAddress}
        </ActAddress>
      )}
      <div>{act.comment || "-"}</div>
      <div>{dayjs(act.actJobDate).format('DD.MM.YYYY')}</div>
    </Wrapper>
  );
};
