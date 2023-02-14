import { Skeleton } from 'antd';
import React, { FC } from 'react';
import { IndividualDeviceListItem } from './IndividualDeviceListItem';
import { Header, Wrapper } from './IndividualDevicesList.styled';
import { IndividualDevicesListProps } from './IndividualDevicesList.types';

export const IndividualDevicesList: FC<IndividualDevicesListProps> = ({
  isLoading,
  individualDevicesList,
  apartmentId,
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
          <IndividualDeviceListItem
            apartmentId={apartmentId}
            key={device.id}
            device={device}
            consumptionData={[
              { consumption: 100, date: '2022-11-01T00:00:00' },
              { consumption: 450, date: '2022-10-01T00:00:00' },
              { consumption: 100, date: '2022-09-01T00:00:00' },
              { consumption: 10, date: '2022-08-01T00:00:00' },
              { consumption: 523, date: '2022-07-01T00:00:00' },
              { consumption: 80, date: '2022-06-01T00:00:00' },
            ]}
          />
        ))}
    </Wrapper>
  );
};
