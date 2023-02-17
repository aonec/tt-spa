import { Skeleton } from 'antd';
import React, { FC } from 'react';
import { FilterExtendedSearch } from 'ui-kit/shared_components/FilterExtendedSearch';
import {
  IndividualDeviceConsumptionGraphLookup,
  IndividualDeviceConsumptionGraphType,
} from '../../individualDevicesListService.constants';
import { IndividualDeviceListItem } from './IndividualDeviceListItem';
import { GroupWrapper, Header, Wrapper } from './IndividualDevicesList.styled';
import { IndividualDevicesListProps } from './IndividualDevicesList.types';

export const IndividualDevicesList: FC<IndividualDevicesListProps> = ({
  isLoading,
  individualDevicesList,
  apartmentId,
  selectGraphType,
  selectedGraphType,
  graphData,
}) => {
  return (
    <Wrapper>
      <Header>
        <div>Прибор</div>
        <div>Статус</div>
        <div>Дата поверки прибора</div>
        <div>Дата следующей поверки прибора</div>
        <div>Текущий расход</div>
        <GroupWrapper>
          Средний расход
          <FilterExtendedSearch
            allowedFilters={Object.entries(
              IndividualDeviceConsumptionGraphLookup,
            ).map(([key, value]) => ({
              key: key as IndividualDeviceConsumptionGraphType,
              value,
            }))}
            selectedFilters={[selectedGraphType]}
            handleUpdate={(types) => selectGraphType(types[0])}
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
            consumptionData={graphData}
          />
        ))}
    </Wrapper>
  );
};
