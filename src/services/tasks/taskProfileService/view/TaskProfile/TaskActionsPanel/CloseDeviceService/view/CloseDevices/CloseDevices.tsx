import { DatePickerNative } from 'ui-kit/shared_components/DatePickerNative';
import { Checkbox } from 'antd';
import React, { FC } from 'react';
import { IndividualDeviceInfoExtended } from 'ui-kit/shared_components/IndividualDeviceInfoExtended';
import {
  DatePickerWrapper,
  DeviceInfoStrokeWrap,
  DeviceInfoWrapper,
  DeviceWrapper,
  Header,
  Wrapper,
} from './CloseDevices.styled';
import { CloseDevicesProps } from './CloseDevices.types';

export const CloseDevices: FC<CloseDevicesProps> = ({
  handleDeviceCheckboxClicked,
  onChangeClosingDate,
  selectedDevices,
  devices,
}) => {
  return (
    <Wrapper>
      <Header>
        <div>Закрытие приборов</div>
        <div>Дата закрытия прибора</div>
      </Header>
      {devices?.map((device) => {
        const selectedDevicePayload = selectedDevices.find(
          ({ id }) => id === device.id,
        );

        const isSelected = Boolean(selectedDevicePayload);
        const closingDate = selectedDevicePayload?.closingDate;

        const handleCheckboxChanged = () =>
          handleDeviceCheckboxClicked(device.id);

        const handleClosingDateChanged = (value: string) =>
          onChangeClosingDate(device.id, value);

        const isClosingDatePickerDisabled = !isSelected;

        return (
          <DeviceWrapper key={device.id}>
            <DeviceInfoWrapper>
              <Checkbox checked={isSelected} onChange={handleCheckboxChanged} />
              <DeviceInfoStrokeWrap>
                <IndividualDeviceInfoExtended device={device} />
              </DeviceInfoStrokeWrap>
            </DeviceInfoWrapper>
            <DatePickerWrapper>
              <DatePickerNative
                value={closingDate}
                onChange={handleClosingDateChanged}
                disabled={isClosingDatePickerDisabled}
              />
            </DatePickerWrapper>
          </DeviceWrapper>
        );
      })}
    </Wrapper>
  );
};
