import { $task } from '01/features/tasks/displayTask/models';
import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import DeviceInfo from '01/_pages/MetersPage/components/MeterDevices/components/DeviceInfo';
import { Checkbox } from 'antd';
import { useStore } from 'effector-react';
import moment from 'moment';
import { IndividualDeviceListItemResponse } from 'myApi';
import React, { FC, useEffect, useState } from 'react';
import {
  DetePickerWrap,
  DeviceInfoStrokeWrap,
  DeviceInfoWrap,
  DeviceRowWrap,
  Header,
  Wrap,
} from './CloseDevices.styled';
import { CloseDevicesProps } from './CloseDevices.types';

export const CloseDevices: FC<CloseDevicesProps> = ({ getData }) => {
  const [selectedDevices, setSelectedDevices] = useState<
    { id: number; closingDate: string | null }[]
  >([]);

  const handleDeviceCheboxClicked = (id: number) => {
    setSelectedDevices((prev) => {
      const isSelected = prev.map(({ id }) => id).includes(id);

      if (isSelected) {
        return prev.filter((elem) => elem.id !== id);
      }

      return [...prev, { id, closingDate: null }];
    });
  };

  const onChangeClosingDate = (id: number, closingDate: string) => {
    setSelectedDevices((prev) =>
      prev.map((elem) => {
        if (elem.id !== id) return elem;

        return { ...elem, closingDate };
      })
    );
  };

  useEffect(() => {
    getData({
      deviceCloses: selectedDevices.map(({ id, closingDate }) => ({
        deviceId: id,
        closingDate: moment(closingDate).toISOString(true),
      })),
    });
  }, [selectedDevices]);

  const task = useStore($task);

  const devices = task?.individualDevices;

  return (
    <Wrap>
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
    </Wrap>
  );
};
