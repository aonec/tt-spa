import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import DeviceInfo from '01/_pages/MetersPage/components/MeterDevices/components/DeviceInfo';
import { Checkbox } from 'antd';
import { IndividualDeviceListItemResponse } from '../../api/types';
import React, { FC } from 'react';
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
  handleDeviceCheboxClicked,
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
          ({ id }) => id === device.id
        );

        const isSelected = Boolean(selectedDevicePayload);
        const closingDate = selectedDevicePayload?.closingDate;

        const handleCheckboxChanged = () =>
          handleDeviceCheboxClicked(device.id);

        const handleClosingDateChanged = (value: string) =>
          onChangeClosingDate(device.id, value);

        const isClosingDatePickerDisabled = !isSelected

        return (
          <DeviceWrapper key={device.id}>
            <DeviceInfoWrapper>
              <Checkbox checked={isSelected} onChange={handleCheckboxChanged} />
              <DeviceInfoStrokeWrap>
                <DeviceInfo
                  device={
                    (device as unknown) as IndividualDeviceListItemResponse
                  }
                />
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
