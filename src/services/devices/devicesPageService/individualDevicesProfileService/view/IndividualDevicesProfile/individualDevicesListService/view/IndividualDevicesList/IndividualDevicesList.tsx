import React, { FC, useCallback } from 'react';
import { FilterExtendedSearch } from 'ui-kit/shared/FilterExtendedSearch';
import {
  IndividualDeviceConsumptionGraphLookup,
  IndividualDeviceConsumptionGraphType,
} from '../../individualDevicesListService.constants';
import {
  ConsumptionDate,
  DeviceStatusWrapper,
  GroupWrapper,
  NoData,
  NoDataText,
} from './IndividualDevicesList.styled';
import { IndividualDevicesListProps } from './IndividualDevicesList.types';
import { Table } from 'ui-kit/Table';
import { IndividualDeviceInfoShort } from 'ui-kit/shared/IndividualDeviceInfoShort';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { useHistory } from 'react-router-dom';
import { DeviceStatus } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus';
import dayjs from 'api/dayjs';
import { Loader } from 'ui-kit/Loader';
import { IndividualDeviceConsumptionGraph } from './IndividualDeviceConsumptionGraph';
import { SearchIcon } from 'ui-kit/icons';

export const IndividualDevicesList: FC<IndividualDevicesListProps> = ({
  isLoading,
  individualDevicesList,
  apartmentId,
  selectGraphType,
  selectedGraphType,
  graphData,
  isConsumptionsLoading,
}) => {
  const history = useHistory();

  const handleClickDevice = useCallback(
    (id: number) => history.push(`/individualDeviceProfile/${id}`),
    [history],
  );

  return (
    <Table
      floating
      headerStyles={'width: 100%;'}
      rowStyles={'width: 100%; height: 64px;'}
      elements={individualDevicesList || []}
      columns={[
        {
          label: 'Прибор',
          size: '0.6fr',
          render: (device) => (
            <Tooltip
              title={`${device.serialNumber || ''} (${device.model || ''})`}
            >
              <div>
                <IndividualDeviceInfoShort
                  onClick={handleClickDevice}
                  device={device}
                />
              </div>
            </Tooltip>
          ),
        },
        {
          label: 'Статус',
          size: '0.24fr',
          render: (device) => (
            <DeviceStatusWrapper>
              <DeviceStatus isActive={!device.closingDate} />
            </DeviceStatusWrapper>
          ),
        },
        {
          label: 'Дата поверки прибора',
          css: (isHeader) =>
            isHeader ? 'white-space: normal !important;' : '',
          size: '0.3fr',
          render: (device) =>
            dayjs(device.lastCheckingDate).format('DD.MM.YYYY'),
          sortedCb: (first, second) => {
            const firstLastCheckingDate = dayjs(first.lastCheckingDate);
            const secondLastCheckingDate = dayjs(second.lastCheckingDate);
            if (
              firstLastCheckingDate.isValid() &&
              secondLastCheckingDate.isValid()
            ) {
              return firstLastCheckingDate.diff(secondLastCheckingDate, 's');
            }
            return -1;
          },
        },
        {
          label: 'Дата следующей поверки прибора',
          css: (isHeader) =>
            isHeader ? 'white-space: normal !important;' : '',
          size: '0.32fr',
          render: (device) =>
            dayjs(device.futureCheckingDate).format('DD.MM.YYYY'),
          sortedCb: (first, second) => {
            const firstFutureCheckingDate = dayjs(first.futureCheckingDate);
            const secondFutureCheckingDate = dayjs(second.futureCheckingDate);
            if (
              firstFutureCheckingDate.isValid() &&
              secondFutureCheckingDate.isValid()
            ) {
              return firstFutureCheckingDate.diff(
                secondFutureCheckingDate,
                's',
              );
            }
            return -1;
          },
        },
        {
          label: 'Текущий расход',
          css: (isHeader) =>
            isHeader ? 'white-space: normal !important;' : '',
          size: '0.26fr',
          render: (device) => {
            const consumption = device.consumption?.consumption;
            if (consumption === undefined) {
              return '-';
            }
            return (
              <div>
                <span>{device.consumption?.consumption}</span>
                <ConsumptionDate>
                  {dayjs(device.consumption?.readingDate).format('DD.MM.YYYY')}
                </ConsumptionDate>{' '}
              </div>
            );
          },
          sortedCb: (first, second) =>
            (first?.consumption?.consumption ?? -1) -
            (second?.consumption?.consumption ?? 0),
        },
        {
          label: (
            <GroupWrapper>
              <span>Средний расход</span>
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
          ),
          size: '0.55fr',
          render: (device) => {
            const consumptionData =
              graphData.find((elem) => elem.deviceId === device.id)
                ?.consumptions || [];
            const isConsumptionExist =
              consumptionData.filter((elem) => Boolean(elem.consumption))
                .length !== 0;

            return (
              <Loader show={isConsumptionsLoading} size={20}>
                {isConsumptionExist && (
                  <IndividualDeviceConsumptionGraph
                    resource={device.resource}
                    data={consumptionData}
                  />
                )}
                {!isConsumptionExist && (
                  <NoData>
                    <SearchIcon />
                    <NoDataText>Недостаточно данных</NoDataText>
                  </NoData>
                )}
              </Loader>
            );
          },
        },
      ]}
    />
  );
};
