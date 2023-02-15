import { Skeleton } from 'antd';
import React, { FC, useState } from 'react';
import { FilterExtendedSearch } from 'ui-kit/shared_components/FilterExtendedSearch';
import { IndividualDeviceListItem } from './IndividualDeviceListItem';
import { GroupWrapper, Header, Wrapper } from './IndividualDevicesList.styled';
import {
  IndividualDeviceConsumptionGraphLookup,
  IndividualDeviceConsumptionGraphType,
  IndividualDevicesListProps,
} from './IndividualDevicesList.types';

export const IndividualDevicesList: FC<IndividualDevicesListProps> = ({
  isLoading,
  individualDevicesList,
  apartmentId,
}) => {
  const [typeOfConsumptionGraph, setTypeOfConsumptionGraph] =
    useState<IndividualDeviceConsumptionGraphType>(
      IndividualDeviceConsumptionGraphType.BySixMonths,
    );

  return (
    <Wrapper>
      <Header>
        <div>Прибор</div>
        <div>Статус</div>
        <div>Дата поверки прибора</div>
        <div>Дата следующей поверки прибора</div>
        <div>Текущий расход</div>
        <GroupWrapper>
          Расход
          <FilterExtendedSearch
            allowedFilters={Object.entries(
              IndividualDeviceConsumptionGraphLookup,
            ).map(([key, value]) => ({
              key: key as IndividualDeviceConsumptionGraphType,
              value,
            }))}
            selectedFilters={[typeOfConsumptionGraph]}
            handleUpdate={(types) => setTypeOfConsumptionGraph(types[0])}
            allowClear={false}
            max={1}
          />
        </GroupWrapper>
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
              { consumption: 300, date: '2022-08-01T00:00:00' },
              { consumption: 900, date: '2022-07-01T00:00:00' },
              { consumption: 80, date: '2022-06-01T00:00:00' },
            ]}
          />
        ))}
    </Wrapper>
  );
};
