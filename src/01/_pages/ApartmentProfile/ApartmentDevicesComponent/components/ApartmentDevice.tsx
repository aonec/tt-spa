import React from 'react';
import DeviceIcons from '01/_components/DeviceIcons';
import { DateLine } from '01/_components/DateLine/DateLine';
import { translateMountPlace } from '01/utils/translateMountPlace';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../_components/Icon';
import { IndividualDeviceListItemResponse } from '../../../../../myApi';
import moment from 'moment';

interface DeviceInfoProps {
  device: IndividualDeviceListItemResponse;
}

const ApartmentDevice = ({ device }: DeviceInfoProps) => {
  const { icon, color } = DeviceIcons[device.resource];
  const {
    id,
    model,
    serialNumber,
    mountPlace,
    lastCheckingDate,
    futureCheckingDate,
    hasMagneticSeal,
  } = device;
  return (
    <DeviceColumn>
      <DeviceLink to={`/individualDevices/${id}`}>
        <div>
          <DeviceIcon icon={icon} fill={color} />
        </div>
        {`${model} `}
        <SerialNumber>{` (${serialNumber})`}</SerialNumber>
      </DeviceLink>
      <ApartmentInfo>
        <MountPlace>{translateMountPlace(mountPlace)}</MountPlace>
        <DateLine
          lastCheckingDate={lastCheckingDate}
          futureCheckingDate={futureCheckingDate}
        />
      </ApartmentInfo>
      {hasMagneticSeal && (
        <MagneticSeal>
          Пломба{' '}
          {device.magneticSealInstallationDate &&
            moment(device.magneticSealInstallationDate).format('DD.MM.YYYY')}
        </MagneticSeal>
      )}
    </DeviceColumn>
  );
};

const MagneticSeal = styled.div`
  margin: 3px 0 0 24px;
`;

const DeviceColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 120px;
  white-space: nowrap;
`;

const DeviceLink = styled(Link)`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  line-height: 2;
  color: #272f5a;
`;

const DeviceIcon = styled(Icon)`
  margin-right: 8px;
`;

const SerialNumber = styled.span`
  margin-left: 6px;
  font-weight: normal;
  color: rgba(39, 47, 90, 0.6);
`;

const ApartmentInfo = styled.div`
  display: flex;
`;

const MountPlace = styled.div`
  margin-left: 24px;
  margin-right: 16px;
  color: rgba(39, 47, 90, 0.6);
`;

export default ApartmentDevice;
