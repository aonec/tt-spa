import React, { FC, useMemo } from 'react';
import { ResourceIconLookup } from '../ResourceIconLookup';
import {
  IconWrapper,
  Model,
  SealWrapper,
  SerialNumber,
  Wrapper,
} from './IndividualDeviceInfoShort.styled';
import { IndividualDeviceInfoShortProps } from './IndividualDeviceInfoShort.types';
import { useStore } from 'effector-react';
import { $allIndividualDeviceMountPlaces } from '01/features/individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models';

export const IndividualDeviceInfoShort: FC<IndividualDeviceInfoShortProps> = ({
  device,
  onClick,
}) => {
  const allIndividualDeviceMountPlaces = useStore(
    $allIndividualDeviceMountPlaces,
  );

  const mountPlace = useMemo(
    () =>
      (allIndividualDeviceMountPlaces &&
        device.model &&
        allIndividualDeviceMountPlaces.find(
          (mountPlaceFromServer) => mountPlaceFromServer.name === device.model,
        )?.description) ||
      '',
    [device, allIndividualDeviceMountPlaces],
  );

  const modelDescription = `${device.model} ${mountPlace}`;

  return (
    <Wrapper onClick={onClick} clickable={Boolean(onClick)}>
      <IconWrapper>
        {device.resource && <ResourceIconLookup resource={device.resource} />}
      </IconWrapper>
      <SerialNumber>{device.serialNumber}</SerialNumber>
      <Model>{modelDescription}</Model>
      <SealWrapper>{}</SealWrapper>
    </Wrapper>
  );
};
