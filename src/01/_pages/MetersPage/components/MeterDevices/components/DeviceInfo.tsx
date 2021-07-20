import React, { useState } from 'react';
import ActiveLine from '../../../../../components/Select/selects/AddReadings/DeviceReadingForm/ActiveLine/ActiveLine';
import { DateLine } from '../../../../../_components/DateLine/DateLine';
import { translateMountPlace } from '../../../../../utils/translateMountPlace';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '../../../../../_components/Icon';
import DeviceIcons from '../../../../../_components/DeviceIcons';
import { IndividualDeviceListItemResponse } from '../../../../../../myApi';
import { Switch } from 'antd';
import { Flex } from '01/shared/ui/Layout/Flex';
import axios from '01/axios';
import moment from 'moment';

interface DeviceInfoProps {
  device: IndividualDeviceListItemResponse;
}

const DeviceInfo = ({ device }: DeviceInfoProps) => {
  const { icon, color } = DeviceIcons[device.resource];
  const isActive = device.closingDate === null;
  const [switched, setSwitched] = useState(false);
  const [
    switchedMagneticSealInstallationDate,
    setSwitchedMagneticSealInstallationDate,
  ] = useState<string | null>(null);

  async function switchMagnetSeal() {
    setSwitched((prev) => !prev);
    try {
      const res: any = await axios.post(
        `IndividualDevices/${device.id}/SwitchMagneticSeal`,
        {
          magneticSealInstallationDate: null,
          magneticSealTypeName: null,
        }
      );

      setSwitchedMagneticSealInstallationDate(
        res?.magneticSealInstallationDate
      );
    } catch (e) {
      setSwitched((prev) => !prev);
    }
  }

  const onSwitchMagnetSeal = () => void switchMagnetSeal();

  const checked = switched ? !device.hasMagneticSeal : device.hasMagneticSeal;
  const magneticSealInstallationDate = switchedMagneticSealInstallationDate
    ? moment(switchedMagneticSealInstallationDate).format('DD.MM.YYYY')
    : checked &&
      device.magneticSealInstallationDate &&
      moment(device.magneticSealInstallationDate).format('DD.MM.YYYY');

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
      <MagnetSeal>
        <Switch
          size="small"
          checked={checked}
          disabled={!isActive}
          onChange={onSwitchMagnetSeal}
        />
        <div style={{ marginLeft: '10px' }}>
          Магнитная пломба {magneticSealInstallationDate}
        </div>
      </MagnetSeal>
    </DeviceColumn>
  );
};

const MagnetSeal = styled(Flex)`
  align-items: center;
  margin-top: 7px;

  :first-child {
    margin-right: 10px;
  }
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
