import React, { FC } from 'react';
import { ActAddress, ActDate, Comment, Wrapper } from './ActsListItem.styled';
import { ActsListItemProps } from './ActsListItem.types';
import dayjs from 'api/dayjs';
import { ActTypesNamesLookup } from 'dictionaries';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { ClipIcon } from 'ui-kit/icons';
import { Button } from 'ui-kit/Button';
import { message } from 'antd';

export const ActsListItem: FC<ActsListItemProps> = ({ act, handleOpenDoc }) => {
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
      <Tooltip title={act.comment}>
        <Comment>{act.comment || '-'}</Comment>
      </Tooltip>
      <div>{dayjs(act.actJobDate).format('DD.MM.YYYY')}</div>
      {act.document && (
        <Button type="ghost" size="s">
          <ClipIcon
            onClick={() =>
              act.document?.id
                ? handleOpenDoc(act.document.id)
                : message.error('Документ не найден')
            }
          />
        </Button>
      )}
    </Wrapper>
  );
};
