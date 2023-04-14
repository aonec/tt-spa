import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { DeviceStatus } from 'ui-kit/shared_components/IndividualDeviceInfo/DeviceStatus';
import { IndividualDeviceInfoExtendedProps } from './IndividualDeviceInfoExtended.types';
import {
  ApartmentInfo,
  ClosingDate,
  DateLineWrapper,
  Wrapper,
  DeviceLink,
  ModelWrapper,
  MountPlace,
  SerialNumberWrapper,
} from './IndividualDeviceInfoExtended.styled';
import { prepareDateForDateLine } from './IndividualDeviceInfoExtended.utils';
import { Tooltip } from 'antd';
import {
  $allIndividualDeviceMountPlaces,
  AllIndividualDeviceMountPlacesGate,
} from '01/features/individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models';
import { useStore } from 'effector-react';

export const IndividualDeviceInfoExtended: FC<
  IndividualDeviceInfoExtendedProps
> = ({ device }) => {
  const isActive = device.closingDate === null;
  const history = useHistory();

  const allIndividualDeviceMountPlaces = useStore(
    $allIndividualDeviceMountPlaces,
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
      <DeviceLink to={history.location.pathname}>
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
      </DeviceLink>
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
