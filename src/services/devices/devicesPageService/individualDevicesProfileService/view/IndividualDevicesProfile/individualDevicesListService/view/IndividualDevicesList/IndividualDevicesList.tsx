import React, { FC } from 'react';
import { FilterExtendedSearch } from 'ui-kit/shared/FilterExtendedSearch';
import { WithLoader } from 'ui-kit/shared/WithLoader';
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
  isConsumptionsLoading,
}) => {
  return (
    <Wrapper>
      <Header>
        <div>Прибор</div>
        <div>Статус</div>
        <div>Разрядность</div>
        <div>Дата поверки</div>
        <div>Дата сл. поверки</div>
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
      <WithLoader isLoading={isLoading}>
        {individualDevicesList?.map((device) => (
          <IndividualDeviceListItem
            apartmentId={apartmentId}
            isConsumptionsLoading={isConsumptionsLoading}
            key={device.id}
            device={device}
            consumptionData={
              graphData.find((elem) => elem.deviceId === device.id)
                ?.consumptions || []
            }
          />
        ))}
      </WithLoader>
    </Wrapper>
  );
};
