import { Tooltip } from 'ui-kit/shared/Tooltip';
import dayjs from 'api/dayjs';
import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchIcon } from 'ui-kit/icons';
import { DeviceStatus } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus';
import { IndividualDeviceInfoShort } from 'ui-kit/shared/IndividualDeviceInfoShort';
import { IndividualDeviceConsumptionGraph } from '../IndividualDeviceConsumptionGraph';
import {
  Consumption,
  ConsumptionDate,
  DateWrapper,
  DeviceStatusWrapper,
  NoData,
  NoDataText,
  Wrapper,
} from './IndividualDeviceListItem.styled';
import { IndividualDeviceListItemProps } from './IndividualDeviceListItem.types';
import { Loader } from 'ui-kit/Loader';

export const IndividualDeviceListItem: FC<IndividualDeviceListItemProps> = ({
  device,
  apartmentId,
  consumptionData,
  isConsumptionsLoading,
}) => {
  const history = useHistory();

  const handleClickDevice = useCallback(
    () => history.push(`/apartments/${apartmentId}/testimony`),
    [history, apartmentId],
  );

  const isConsumptionExist =
    consumptionData.filter((elem) => Boolean(elem.consumption)).length !== 0;

  return (
    <Wrapper>
      <Tooltip title={`${device.serialNumber || ''} (${device.model || ''})`}>
        <div>
          <IndividualDeviceInfoShort
            onClick={handleClickDevice}
            device={device}
          />
        </div>
      </Tooltip>
      <DeviceStatusWrapper>
        <DeviceStatus isActive={!device.closingDate} />
      </DeviceStatusWrapper>
      <DateWrapper>
        {dayjs(device.lastCheckingDate).format('DD.MM.YYYY')}
      </DateWrapper>
      <DateWrapper>
        {dayjs(device.futureCheckingDate).format('DD.MM.YYYY')}
      </DateWrapper>
      <div>
        <Consumption>{device.consumption?.consumption}</Consumption>
        <ConsumptionDate>
          {dayjs(device.consumption?.readingDate).format('DD.MM.YYYY')}
        </ConsumptionDate>
      </div>
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
    </Wrapper>
  );
};
