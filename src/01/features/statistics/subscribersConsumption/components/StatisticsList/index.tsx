import { Grid } from '01/shared/ui/Layout/Grid';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import { $consumptionStatistics } from '../../models';
import { SubscriberStatisticsСonsumptionResponse } from 'myApi';
import moment from 'moment';

export const StatisticsList: React.FC = () => {
  const apartmentsList = useStore($consumptionStatistics);

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
      <div>{coldWaterSupplyСonsumption}</div>
      <div>{hotWaterSupplyСonsumption}</div>
      <div>{electricitySupplyСonsumption}</div>
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
      <div>{apartmentsList?.sort(sortApartments)?.map(renderApartment)}</div>
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
