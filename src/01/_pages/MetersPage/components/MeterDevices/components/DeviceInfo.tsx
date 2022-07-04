import React from 'react';
import ActiveLine from '../../../../../components/Select/selects/AddReadings/DeviceReadingForm/ActiveLine/ActiveLine';
import { DateLine } from '../../../../../_components/DateLine/DateLine';
import { translateMountPlace } from '../../../../../utils/translateMountPlace';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import DeviceIcons from '../../../../../_components/DeviceIcons';
import { IndividualDeviceListItemResponse } from '../../../../../../myApi';
import { Space } from '../../../../../shared/ui/Layout/Space/Space';
import { StockIconTT } from '01/_pages/Devices/components/DeviceBlock/DeviceBlock';
import moment from 'time';

interface DeviceInfoProps {
  device: IndividualDeviceListItemResponse;
}

const DeviceInfo = ({ device }: DeviceInfoProps) => {
  const { icon, color } = DeviceIcons[device.resource] || {};
  const isActive = device.closingDate === null;
  const history = useHistory();

  return (
    <DeviceColumn>
      <DeviceLink to={history.location.pathname}>
        <Space>
          <StockIconTT icon={icon} fill={color} dark />
        </Space>
        <Space w={7} />
        {device.serialNumber}
        <SerialNumber>{` ${device.model}`}</SerialNumber>
        <MountPlace>{translateMountPlace(device.mountPlace)}</MountPlace>
      </DeviceLink>
      <ApartmentInfo>
        <ActiveLine isActive={isActive} closingReason={device.closingReason} />
        <DateLine
          lastCheckingDate={device.lastCheckingDate}
          futureCheckingDate={device.futureCheckingDate}
        />
      </ApartmentInfo>
      {device.closingDate && (
        <ClosingDate>
          {moment(device.closingDate).format('DD.MM.YYYY')}
        </ClosingDate>
      )}
    </DeviceColumn>
  );
};

const ClosingDate = styled.div`
  margin-top: 2px;
  margin-left: 25px;
  font-weight: bold;
`;

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

const SerialNumber = styled.span`
  margin-left: 6px;
  font-weight: normal;
  color: rgba(39, 47, 90, 0.6);
`;

const ApartmentInfo = styled.div`
  display: flex;
  margin-left: 22px;
`;

const MountPlace = styled.div`
  margin-left: 8px;
  font-weight: 400;
  color: rgba(39, 47, 90, 0.6);
`;

export default DeviceInfo;
