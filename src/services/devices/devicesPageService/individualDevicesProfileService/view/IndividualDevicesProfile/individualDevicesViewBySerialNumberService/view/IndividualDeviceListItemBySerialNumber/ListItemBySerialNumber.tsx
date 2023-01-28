import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import { Tooltip } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import {
  AdditionalHomeownersCountTextWrapper,
  AdditionalHomeownersCountWrapper,
} from 'services/objects/objectProfileService/apartmentsListService/view/ApartmentsView/ApartmentsList/ApartmentItem/ApartmentItem.styled';
import {
  IndividualDevicesListContainer,
  individualDevicesListService,
} from '../../../individualDevicesListService';
import { Chevron } from '../../../individualDevicesViewByAddressService/view/IndividualDevicesApartmentsList/IndividualDevicesApartmentItem/IndividualDevicesApartmentItem.styled';
import {
  AddressWrapper,
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

const { inputs, outputs } = individualDevicesListService;

export const IndividualDeviceListItemBySerialNumber: FC<IndividualDeviceListItemBySerialNumberProps> = ({
  device,
}) => {
  const { serialNumber, address, homeowners } = device;

  const openedDeviceId = useStore(outputs.$openedBlockId);

  const toggleDevice = useEvent(inputs.toggleBlock);

  const addressString = getApartmentAddressForList(address);
  const additionalHomeownersCount = (homeowners?.length || 1) - 1;

  const { name, personalNumber } = getHomeownerName(homeowners || []) || {};

  const isDeviceOpen = openedDeviceId === device.id;

  return (
    <>
      <Wrapper
        isDeviceOpen={isDeviceOpen}
        onClick={() => device.id && toggleDevice(device.id)}
      >
        <GroupWrapper>
          <Chevron open={isDeviceOpen} />
          <SerialNumberWrapper>{serialNumber}</SerialNumberWrapper>
        </GroupWrapper>
        <GroupWrapper>
          <Tooltip title={addressString}>
            <AddressWrapper>{addressString}</AddressWrapper>
          </Tooltip>
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
      {isDeviceOpen && device.id && (
        <IndividualDevicesListContainer
          apartmentId={device.apartmentId}
          housingStockId={device.housingStockId}
          devicesIds={[device.id]}
        />
      )}
    </>
  );
};
