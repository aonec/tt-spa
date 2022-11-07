import { Skeleton } from 'antd';
import React, { FC } from 'react';
import { IndividualDeviceListItem } from './IndividualDeviceListItem';
import { Header, Wrapper } from './IndividualDevicesList.styled';
import { IndividualDevicesListProps } from './IndividualDevicesList.types';

export const IndividualDevicesList: FC<IndividualDevicesListProps> = ({
  isLoading,
  individualDevicesList,
}) => {
  return (
    <Wrapper>
      <Header>
        <div>Прибор</div>
        <div>Статус</div>
        <div>Дата поверки прибора</div>
        <div>Дата следующей поверки прибора</div>
        <div>Текущий расход</div>
        <div>Расход</div>
      </Header>
      {isLoading && <Skeleton active />}
      {!isLoading &&
        individualDevicesList?.map((device) => (
          <IndividualDeviceListItem key={device.id} device={device} />
        ))}
    </Wrapper>
  );
};
