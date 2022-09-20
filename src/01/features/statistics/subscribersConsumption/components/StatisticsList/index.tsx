import { Grid } from '01/shared/ui/Layout/Grid';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import { SubscriberStatisticsСonsumptionResponse } from 'myApi';
import moment from 'moment';
import { round } from '01/hooks/useReadings';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import { useHistory } from 'react-router';
import { TypeAddressToStart } from '01/shared/ui/TypeToStart';
import {
  $consumptionStatistics,
  subscribersConsumptionService,
} from '../../models';
import { ExportSubscribersConsumptionContainer } from '../../exportSubscribersConsumptionService';

export const StatisticsList: React.FC = () => {
  const apartmentList = useStore($consumptionStatistics);

  const pending = useStore(subscribersConsumptionService.outputs.$isLoading);
  const history = useHistory();
  const isApartmentsExist = apartmentList.length !== 0;

  const filter = useStore(
    subscribersConsumptionService.outputs.$subscriberStatisticsFilter
  );

  const renderApartment = ({
    apartmentNumber,
    coldWaterSupplyConsumption,
    hotWaterSupplyConsumption,
    electricitySupplyConsumption,
    dateLastCheck,
    dateLastTransmissionOfReading,
    housingStockId,
    apartmentId,
  }: SubscriberStatisticsСonsumptionResponse) => (
    <ApartmentWrap
      {...layout}
      onClick={() =>
        history.push(`/objects/${housingStockId}/apartments/${apartmentId}`)
      }
    >
      <div>{apartmentNumber}</div>
      <div>{formatValue(round(coldWaterSupplyConsumption!, 3))}</div>
      <div>{formatValue(round(hotWaterSupplyConsumption!, 3))}</div>
      <div>{formatValue(round(electricitySupplyConsumption!, 3))}</div>
      <div>{moment(dateLastTransmissionOfReading).format('DD.MM.YYYY')}</div>
      <div>{dateLastCheck && moment(dateLastCheck).format('DD.MM.YYYY')}</div>
    </ApartmentWrap>
  );

  return (
    <div>
      <ExportSubscribersConsumptionContainer filter={filter} />
      {isApartmentsExist && (
        <Wrap {...layout}>
          <div>Номер квартиры</div>
          <div>ХВС</div>
          <div>ГВС</div>
          <div>Электричество</div>
          <div>Дата последней передачи показаний</div>
          <div>Дата последней проверки</div>
        </Wrap>
      )}
      {!pending && !isApartmentsExist && <TypeAddressToStart />}
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
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #3241e6;
    background-color: #3948f113;
  }

  &:last-child {
    border-bottom: none;
  }
`;
