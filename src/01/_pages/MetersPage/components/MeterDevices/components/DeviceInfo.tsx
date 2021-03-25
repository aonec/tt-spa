import React from 'react';
import { IndividualDeviceType } from '../../../../../../types/types';
import ActiveLine from '../../../../../components/Select/selects/AddReadings/DeviceReadingForm/ActiveLine/ActiveLine';
import { DateLine } from '../../../../../_components/DateLine/DateLine';
import { translateMountPlace } from '../../../../../utils/translateMountPlace';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../../_components/Icon';
import DeviceIcons from '../../../../../_components/DeviceIcons';

interface DeviceInfoProps {
  device: IndividualDeviceType;
}

const DeviceInfo = ({ device }: DeviceInfoProps) => {
  const { icon, color } = DeviceIcons[device.resource];
  const isActive = device.closingDate === null;

  return (
    <DeviceColumn>
      <DeviceLink to={`/housingMeteringDevices/${device.id}`}>
        <DeviceIcon icon={icon} fill={color} />
        {`${device.model} `}
        <SerialNumber>{` (${device.serialNumber})`}</SerialNumber>
      </DeviceLink>
      <ApartmentInfo>
        <ActiveLine isActive={isActive} />
        <DateLine
          lastCheckingDate={device.lastCheckingDate}
          futureCheckingDate={device.futureCheckingDate}
        />
        <MountPlace>{translateMountPlace(device.mountPlace)}</MountPlace>
      </ApartmentInfo>
    </DeviceColumn>
  );
};

const DeviceColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 120px;
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
  margin-left: 16px;
  color: rgba(39, 47, 90, 0.6);
`;

export default DeviceInfo;
