import { Grid } from '01/shared/ui/Layout/Grid';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import {
  $consumptionStatistics,
  fetchConsumptionStatistics,
} from '../../models';
import { SubscriberStatisticsСonsumptionResponse } from 'myApi';
import moment from 'moment';
import { round } from '01/hooks/useReadings';
import { PendingLoader } from '01/shared/ui/PendingLoader';

export const StatisticsList: React.FC = () => {
  const apartmentsList = useStore($consumptionStatistics);
  const pending = useStore(fetchConsumptionStatistics.pending);

  const sortApartments = (
    apartment1: SubscriberStatisticsСonsumptionResponse,
    apartment2: SubscriberStatisticsСonsumptionResponse
  ) => {
    const first = Number(apartment1.apartmentNumber) || 0;
    const second = Number(apartment2.apartmentNumber) || 0;

    return first > second ? 1 : first < second ? -1 : 0;
  };

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
      <div>{round(coldWaterSupplyСonsumption!, 3)}</div>
      <div>{round(hotWaterSupplyСonsumption!, 3)}</div>
      <div>{round(electricitySupplyСonsumption!, 3)}</div>
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
        <div>{apartmentsList?.sort(sortApartments)?.map(renderApartment)}</div>
      </PendingLoader>
    </div>
  );
};

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
