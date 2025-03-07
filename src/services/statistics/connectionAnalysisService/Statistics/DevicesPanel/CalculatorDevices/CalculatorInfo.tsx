import { FC } from 'react';
import {
  DeviceInfoWrapper,
  DeviceTitleWrapper,
  Model,
  SerialNumber,
  StatusWrapper,
  Wrapper,
} from './CalculatorInfo.styled';
import { Props } from './CalculatorInfo.types';
import { Link } from 'react-router-dom';
import { CalculatorIcon } from 'ui-kit/icons';
import { StatusBar } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus/DeviceStatus.styled';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import dayjs from 'dayjs';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton';

export const CalculatorInfo: FC<Props> = ({ device }) => {
  const deviceInfo = (
    <DeviceInfoWrapper>
      <Model>{device.model}</Model>
      <SerialNumber>({device.serialNumber})</SerialNumber>
    </DeviceInfoWrapper>
  );

  return (
    <Wrapper>
      <DeviceTitleWrapper>
        <CalculatorIcon />

        {device.id && (
          <Link to={`/calculators/${device.id}/profile`}>{deviceInfo}</Link>
        )}
        {!device.id && deviceInfo}
      </DeviceTitleWrapper>

      <div>
        {(device.connectionInfo?.lastHourlyArchiveTime ||
          device.connectionInfo?.lastDailyArchiveTime) &&
          dayjs(
            device.connectionInfo?.lastHourlyArchiveTime ||
              device.connectionInfo?.lastDailyArchiveTime,
          ).format('DD.MM.YYYY HH:mm')}
      </div>

      <StatusWrapper>
        <StatusBar isActive={device.isConnected} />
        {device.isConnected ? 'Активен' : 'Нет соединения'}
      </StatusWrapper>

      {getBuildingAddress(device.address)}

      <ContextMenuButton
        size="small"
        menuButtons={[
          {
            title: 'Опросить вычислитель',
            onClick: () => {},
          },
        ]}
      />
    </Wrapper>
  );
};
