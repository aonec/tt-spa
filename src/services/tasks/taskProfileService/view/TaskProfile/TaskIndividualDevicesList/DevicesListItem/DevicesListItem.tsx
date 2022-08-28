import React, { FC } from 'react';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  DeviceModelText,
  DeviceSerialNumberText,
  GroupWrapper,
  LinkSC,
  Wrapper,
} from './DevicesListItem.styled';
import { DevicesListItemProps } from './DevicesListItem.types';

export const DevicesListItem: FC<DevicesListItemProps> = ({
  device,
  apartmentId,
  housingStockId,
}) => {
  const { resource, serialNumber, model, id } = device;

  return (
    <Wrapper>
      <GroupWrapper>
        <ResourceIconLookup resource={resource} />
        <DeviceSerialNumberText>{serialNumber}</DeviceSerialNumberText>
        <DeviceModelText>({model})</DeviceModelText>
      </GroupWrapper>
      <GroupWrapper>
        <LinkSC
          to={`/objects/${housingStockId}/apartments/${apartmentId}/testimony`}
        >
          Перейти в профиль
        </LinkSC>
      </GroupWrapper>
    </Wrapper>
  );
};
