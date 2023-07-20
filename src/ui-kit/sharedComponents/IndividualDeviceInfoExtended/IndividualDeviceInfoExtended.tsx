import React, { FC } from 'react';
import moment from 'moment';
import { ResourceIconLookup } from 'ui-kit/sharedComponents/ResourceIconLookup';
import { DeviceStatus } from 'ui-kit/sharedComponents/IndividualDeviceInfo/DeviceStatus';
import { IndividualDeviceInfoExtendedProps } from './IndividualDeviceInfoExtended.types';
import {
  ApartmentInfo,
  ClosingDate,
  DateLineWrapper,
  Wrapper,
  ModelWrapper,
  MountPlace,
  SerialNumberWrapper,
  LinkWrapper,
} from './IndividualDeviceInfoExtended.styled';
import { prepareDateForDateLine } from './IndividualDeviceInfoExtended.utils';
import { Tooltip } from 'antd';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService/individualDeviceMountPlacesService.model';
import { useStore } from 'effector-react';

const { AllIndividualDeviceMountPlacesGate } =
  individualDeviceMountPlacesService.gates;

export const IndividualDeviceInfoExtended: FC<
  IndividualDeviceInfoExtendedProps
> = ({ device, onClick }) => {
  const isActive = device.closingDate === null;

  const allIndividualDeviceMountPlaces = useStore(
    individualDeviceMountPlacesService.outputs.$allIndividualDeviceMountPlaces,
  );

  const preparedLastCheckingDate = prepareDateForDateLine(
    device.lastCheckingDate,
  );
  const preparedFutureCheckingDate = prepareDateForDateLine(
    device.futureCheckingDate,
  );
  const isSkin = Boolean(
    preparedLastCheckingDate && preparedFutureCheckingDate,
  );

  return (
    <Wrapper>
      {!allIndividualDeviceMountPlaces && (
        <AllIndividualDeviceMountPlacesGate />
      )}
      <LinkWrapper onClick={onClick} clickable={Boolean(onClick)}>
        <ResourceIconLookup resource={device.resource} />
        <SerialNumberWrapper>{device.serialNumber}</SerialNumberWrapper>
        <ModelWrapper>
          <Tooltip title={device.model}>{device.model}</Tooltip>
        </ModelWrapper>
        <MountPlace>
          {allIndividualDeviceMountPlaces &&
            device.mountPlace &&
            allIndividualDeviceMountPlaces.find(
              (mountPlaceFromServer) =>
                mountPlaceFromServer.name === device.mountPlace,
            )?.description}
        </MountPlace>
      </LinkWrapper>
      <ApartmentInfo>
        <DeviceStatus
          isActive={isActive}
          closingReason={device.closingReason}
        />
        <DateLineWrapper>
          {preparedLastCheckingDate}
          {isSkin && ' — '}
          {preparedFutureCheckingDate}
        </DateLineWrapper>
      </ApartmentInfo>
      {device.closingDate && (
        <ClosingDate>
          {moment(device.closingDate).format('DD.MM.YYYY')}
        </ClosingDate>
      )}
    </Wrapper>
  );
};
