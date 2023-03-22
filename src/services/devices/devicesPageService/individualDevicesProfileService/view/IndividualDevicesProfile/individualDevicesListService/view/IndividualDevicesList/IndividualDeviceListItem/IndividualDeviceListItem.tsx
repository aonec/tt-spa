import { Loader } from '01/components';
import { Tooltip } from 'antd';
import moment from 'moment';
import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchIcon } from 'ui-kit/icons';
import { DeviceStatus } from 'ui-kit/shared_components/IndividualDeviceInfo/DeviceStatus';
import { IndividualDeviceInfoShort } from 'ui-kit/shared_components/IndividualDeviceInfoShort';
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
        {moment(device.lastCheckingDate).format('DD.MM.YYYY')}
      </DateWrapper>
      <DateWrapper>
        {moment(device.futureCheckingDate).format('DD.MM.YYYY')}
      </DateWrapper>
      <div>
        <Consumption>{device.consumption?.consumption}</Consumption>
        <ConsumptionDate>
          {moment(device.consumption?.readingDate).format('DD.MM.YYYY')}
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
