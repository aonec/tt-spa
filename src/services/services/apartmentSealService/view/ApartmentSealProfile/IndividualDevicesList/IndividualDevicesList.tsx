import React, { FC, useState } from 'react';
import {
  CheckboxSC,
  ColumnTextWrapper,
  GroupWrapper,
  Header,
  Wrapper,
} from './IndividualDevicesList.styled';
import { IndividualDevicesListProps } from './IndividualDevicesList.types';
import { IndividualDeviceListItemResponse } from 'myApi';
import { IndividualDevicesSealListItem } from './IndividualDevicesSealListItem';

export const IndividualDevicesList: FC<IndividualDevicesListProps> = ({
  individualDevices,
}) => {
  const [isShowClosedDevices, setIsShowClosedDevices] = useState(false);

  const closedDevicesCount = individualDevices.filter(
    (device: IndividualDeviceListItemResponse) => Boolean(device.closingDate),
  ).length;

  const closedDevicesCountString = closedDevicesCount
    ? `(${closedDevicesCount})`
    : '';

  return (
    <Wrapper>
      <Header>
        <GroupWrapper>
          <ColumnTextWrapper>Информация о приборе</ColumnTextWrapper>
          <CheckboxSC
            checked={isShowClosedDevices}
            onChange={(e) => setIsShowClosedDevices(e.target.checked)}
            disabled={!closedDevicesCount}
          >
            Показать закрытые {closedDevicesCountString}
          </CheckboxSC>
        </GroupWrapper>
        <ColumnTextWrapper>Пломба</ColumnTextWrapper>
      </Header>
      {individualDevices.map((device) => {
        if (!isShowClosedDevices && Boolean(device.closingDate)) {
          return null;
        }

        return (
          <IndividualDevicesSealListItem key={device.id} device={device} />
        );
      })}
    </Wrapper>
  );
};
