import React, { FC } from 'react';
import dayjs from 'api/dayjs';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { DeviceStatus } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus';
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
  SealWrapper,
} from './IndividualDeviceInfoExtended.styled';
import { prepareDateForDateLine } from './IndividualDeviceInfoExtended.utils';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService/individualDeviceMountPlacesService.model';
import { useUnit } from 'effector-react';

const { AllIndividualDeviceMountPlacesGate } =
  individualDeviceMountPlacesService.gates;

export const IndividualDeviceInfoExtended: FC<
  IndividualDeviceInfoExtendedProps
> = ({ device, onClick }) => {
  const isActive = device.closingDate === null;

  const { allIndividualDeviceMountPlaces } = useUnit({
    allIndividualDeviceMountPlaces:
      individualDeviceMountPlacesService.outputs
        .$allIndividualDeviceMountPlaces,
  });

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
      <LinkWrapper
        to={`/individualDeviceProfile/${device.id}`}
        onClick={onClick}
        clickable={Boolean(onClick)}
      >
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
      <div>
        {device.closingDate && (
          <ClosingDate>
            {dayjs(device.closingDate).format('DD.MM.YYYY')}
          </ClosingDate>
        )}
        {device.sealNumber && (
          <SealWrapper>
            Пломба {device.sealNumber}{' '}
            {device.sealInstallationDate &&
              dayjs(device.sealInstallationDate).format('DD.MM.YYYY')}
          </SealWrapper>
        )}
      </div>
    </Wrapper>
  );
};
