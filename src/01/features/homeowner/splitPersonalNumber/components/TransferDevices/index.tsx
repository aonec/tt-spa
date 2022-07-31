import { Checkbox } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import { IndividualDeviceListItemResponse } from '../../../../../../api/types';
import ActiveLine from '../../../../../components/Select/selects/AddReadings/DeviceReadingForm/ActiveLine/ActiveLine';
import { Flex } from '../../../../../shared/ui/Layout/Flex';
import { Space } from '../../../../../shared/ui/Layout/Space/Space';
import { translateMountPlace } from '../../../../../utils/translateMountPlace';
import { DateLine } from '../../../../../_components/DateLine/DateLine';
import { $individualDevices } from '../../../../individualDevices/displayIndividualDevices/models';
import { DeviceDataString } from '../../../../individualDevices/switchIndividualDevice/components/DeviceDataString';
import { transferDevicesForm } from '../../models';

export const TransferDevices = () => {
  const devices = useStore($individualDevices);
  const { fields } = useForm(transferDevicesForm);

  function toggleDevice(id: number) {
    const hasDevice = fields.individualDeviceIdsForSwitch.value.includes(id);

    if (hasDevice) {
      fields.individualDeviceIdsForSwitch.onChange(
        fields.individualDeviceIdsForSwitch.value.filter((elem) => elem !== id)
      );
    } else {
      fields.individualDeviceIdsForSwitch.onChange([
        ...fields.individualDeviceIdsForSwitch.value,
        id,
      ]);
    }
  }

  const renderDevice = (
    device: IndividualDeviceListItemResponse,
    index: number,
    isSelected: boolean
  ) => (
    <Device
      key={index}
      selected={isSelected}
      onClick={() => toggleDevice(device.id)}
    >
      <Flex>
        <Checkbox checked={isSelected} />
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
      {devices
        .map((value, index) =>
          renderDevice(
            value,
            index,
            fields.individualDeviceIdsForSwitch.value.includes(value.id)
          )
        )}
    </Wrap>
  );
};

export const Wrap = styled.div`
  width: 620px;
  margin-bottom: 25px;
`;

export const renderDevice = (
  device: IndividualDeviceListItemResponse,
  index: number
) => (
  <Device key={index}>
    <Flex>
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

const Device = styled.div`
  padding: 15px;
  cursor: pointer;
  z-index: 0;
  transition: 0.2s;
  border-bottom: 1px solid #ededf1;

  ${({ selected }: { selected?: boolean }) =>
    selected
      ? `
    background-color: #e0efff;
  `
      : `
    &:hover {
      background-color: #f5f5f5;
    }
  `}
`;
