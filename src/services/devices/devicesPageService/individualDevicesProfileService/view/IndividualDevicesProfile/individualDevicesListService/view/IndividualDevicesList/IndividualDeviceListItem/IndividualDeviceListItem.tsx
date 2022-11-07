import { Tooltip } from 'antd';
import moment from 'moment';
import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { SearchIcon } from 'ui-kit/icons';
import { DeviceStatus } from 'ui-kit/shared_components/IndividualDeviceInfo/DeviceStatus';
import { IndividualDeviceInfoShort } from 'ui-kit/shared_components/IndividualDeviceInfoShort';
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
  housingStockId,
  apartmentId,
}) => {
  const history = useHistory();

  const handleClickDevice = useCallback(
    () => history.push(`/objects/${housingStockId}/apartments/${apartmentId}`),
    [history, housingStockId, apartmentId]
  );

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
      <NoData>
        <SearchIcon />
        <NoDataText>Нет данных</NoDataText>
      </NoData>
    </Wrapper>
  );
};
