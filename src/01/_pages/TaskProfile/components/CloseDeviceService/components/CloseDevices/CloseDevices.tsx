import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import DeviceInfo from '01/_pages/MetersPage/components/MeterDevices/components/DeviceInfo';
import { Checkbox } from 'antd';
import { IndividualDeviceListItemResponse } from 'myApi';
import React, { FC } from 'react';
import {
  DetePickerWrap,
  DeviceInfoStrokeWrap,
  DeviceInfoWrap,
  DeviceRowWrap,
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

        return (
          <DeviceRowWrap key={device.id}>
            <DeviceInfoWrap>
              <Checkbox
                checked={isSelected}
                onChange={() => handleDeviceCheboxClicked(device.id)}
              />
              <DeviceInfoStrokeWrap>
                <DeviceInfo
                  device={
                    (device as unknown) as IndividualDeviceListItemResponse
                  }
                />
              </DeviceInfoStrokeWrap>
            </DeviceInfoWrap>
            <DetePickerWrap>
              <DatePickerNative
                value={closingDate}
                onChange={(value) => onChangeClosingDate(device.id, value)}
                disabled={!isSelected}
              />
            </DetePickerWrap>
          </DeviceRowWrap>
        );
      })}
    </Wrapper>
  );
};
