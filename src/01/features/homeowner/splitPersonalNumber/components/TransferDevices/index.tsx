import ActiveLine from '01/components/Select/selects/AddReadings/DeviceReadingForm/ActiveLine/ActiveLine';
import {
  $individualDevices,
  IndividualDevicesGate,
} from '01/features/individualDevices/displayIndividualDevices/models';
import { DeviceDataString } from '01/features/individualDevices/switchIndividualDevice/components/DeviceDataString';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { translateMountPlace } from '01/utils/translateMountPlace';
import { DateLine } from '01/_components/DateLine/DateLine';
import { Checkbox } from 'antd';
import { useStore } from 'effector-react';
import { IndividualDeviceListItemResponse } from 'myApi';
import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

export const TransferDevices = () => {

  const devices = useStore($individualDevices);

  const renderDevice = (
    device: IndividualDeviceListItemResponse,
    index: number
  ) => (
    <Device key={index}>
      <Flex>
        <Checkbox />
        <Space />
        <DeviceDataString device={device} />
        <Space />
        <ActiveLine
          isActive={device.closingDate === null}
          closingReason={device.closingReason}
        />
        <DateLine
          lastCheckingDate={device.lastCheckingDate}
          futureCheckingDate={device.futureCheckingDate}
        />
        <Space />
        <div>{translateMountPlace(device.mountPlace)}</div>
      </Flex>
    </Device>
  );

  return (
    <Wrap>
      {devices.map(renderDevice)}
    </Wrap>
  );
};

export const Wrap = styled.div`
  width: 620px;
  margin-bottom: 25px;
`;

const Device = styled.div`
  padding: 15px;
  cursor: pointer;
  z-index: 0;
  transition: 0.2s;
  border-bottom: 1px solid #ededf1;
`;
