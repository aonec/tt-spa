import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import { Tooltip } from 'antd';
import React, { FC } from 'react';
import {
  AdditionalHomeownersCountTextWrapper,
  AdditionalHomeownersCountWrapper,
} from 'services/objects/objectProfileService/apartmentsListService/view/ApartmentsView/ApartmentsList/ApartmentItem/ApartmentItem.styled';
import { ChevronIcon } from 'ui-kit/icons';
import {
  AddressWrapper,
  ArrowWrapper,
  ContextMenuWrapper,
  GroupWrapper,
  HomeownerAccountNumber,
  HomeownerWrapper,
  SerialNumberWrapper,
  Wrapper,
} from './ListItemBySerialNumber.styled';
import { IndividualDeviceListItemBySerialNumberProps } from './ListItemBySerialNumber.types';
import {
  getApartmentAddressForList,
  getHomeownerName,
} from './ListItemBySerialNumber.utils';

export const IndividualDeviceListItemBySerialNumber: FC<IndividualDeviceListItemBySerialNumberProps> = ({
  device,
}) => {
  const { serialNumber, address, homeowners } = device;

  const addressString = getApartmentAddressForList(address);
  const additionalHomeownersCount = (homeowners?.length || 1) - 1;

  const { name, personalNumber } = getHomeownerName(homeowners || []) || {};

  const isActive = false;

  return (
    <Wrapper>
      <GroupWrapper>
        <ArrowWrapper isActive={isActive}>
          <ChevronIcon />
        </ArrowWrapper>
        <SerialNumberWrapper>{serialNumber}</SerialNumberWrapper>
      </GroupWrapper>
      <GroupWrapper>
        <AddressWrapper>
          <Tooltip title={addressString}>{addressString}</Tooltip>
        </AddressWrapper>
      </GroupWrapper>
      <GroupWrapper>
        <HomeownerWrapper>{name}</HomeownerWrapper>
        {Boolean(additionalHomeownersCount) && (
          <AdditionalHomeownersCountWrapper>
            <AdditionalHomeownersCountTextWrapper>
              +{additionalHomeownersCount}
            </AdditionalHomeownersCountTextWrapper>
          </AdditionalHomeownersCountWrapper>
        )}
      </GroupWrapper>
      <ContextMenuWrapper>
        <HomeownerAccountNumber>
          <Tooltip title={personalNumber}>{personalNumber}</Tooltip>
        </HomeownerAccountNumber>
        <ContextMenuButton size="small" />
      </ContextMenuWrapper>
    </Wrapper>
  );
};
