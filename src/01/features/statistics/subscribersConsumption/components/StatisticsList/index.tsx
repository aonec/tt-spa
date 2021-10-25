import { Grid } from '01/shared/ui/Layout/Grid';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import { fetchConsumptionStatistics } from '../../models';
import { SubscriberStatisticsСonsumptionResponse } from 'myApi';
import moment from 'moment';
import { round } from '01/hooks/useReadings';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import _ from 'lodash';
import { useApartmentList } from './useApartmentList';

export const StatisticsList: React.FC = () => {
  const { apartmentList } = useApartmentList();
  const pending = useStore(fetchConsumptionStatistics.pending);

  const renderApartment = ({
    apartmentNumber,
    coldWaterSupplyСonsumption,
    hotWaterSupplyСonsumption,
    electricitySupplyСonsumption,
    dateLastCheck,
    dateLastTransmissionOfReading,
  }: SubscriberStatisticsСonsumptionResponse) => (
    <ApartmentWrap {...layout}>
      <div>{apartmentNumber}</div>
      <div>{formatValue(round(coldWaterSupplyСonsumption!, 3))}</div>
      <div>{formatValue(round(hotWaterSupplyСonsumption!, 3))}</div>
      <div>{formatValue(round(electricitySupplyСonsumption!, 3))}</div>
      <div>{moment(dateLastTransmissionOfReading).format('DD.MM.YYYY')}</div>
      <div>{dateLastCheck && moment(dateLastCheck).format('DD.MM.YYYY')}</div>
    </ApartmentWrap>
  );

  return (
    <div>
      <Wrap {...layout}>
        <div>Номер квартиры</div>
        <div>ХВС</div>
        <div>ГВС</div>
        <div>Электричество</div>
        <div>Дата последней передачи показаний</div>
        <div>Дата последней проверки</div>
      </Wrap>
      <PendingLoader loading={pending}>
        <div>{apartmentList?.map(renderApartment)}</div>
      </PendingLoader>
    </div>
  );
};

const formatValue = (value?: number) =>
  typeof value === 'number' ? value : '-';

const layout = {
  temp: '1fr 1fr 1fr 1fr 1fr 1fr',
  gap: '15px',
};

const Wrap = styled(Grid)`
  align-items: center;
  background-color: #f3f5f6;
  color: rgba(39, 47, 90, 0.9);
  font-size: 12px;
  padding: 10px 20px;
`;

const ApartmentWrap = styled(Grid)`
  padding: 10px 20px;
  border-bottom: 1px solid #f3f5f6;

  &:last-child {
    border-bottom: none;
  }
`;
