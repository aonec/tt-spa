import { Tooltip } from 'antd';
import React, { FC } from 'react';
import { getTimeStringByUTC } from 'utils/getTimeStringByUTC';
import {
  ApartmentNumberWrapper,
  ConsumptionWrapper,
  HomeownerInfoWrapper,
  HomeownerNameWrapper,
  HomeownerNumberWrapper,
  Wrapper,
} from './SubscribersStatisticsItem.styled';
import { SubscribersStaticsByManagingFirmItemProps } from './SubscribersStatisticsItem.types';
import { prepareSupplyConsumption } from './SubscribersStatisticsItem.utils';

export const SubscribersStaticsByManagingFirmItem: FC<SubscribersStaticsByManagingFirmItemProps> = ({
  statistic,
}) => {
  const {
    apartmentNumber,
    coldWaterSupplyСonsumption,
    hotWaterSupplyСonsumption,
    electricitySupplyСonsumption,
    dateLastCheck,
    dateLastTransmissionOfReading,
    homeownerAccountFullName,
    homeownerAccountPhoneNumber,
    apartmentId,
    housingStockId,
  } = statistic;

  const preparedLastCheckDate = dateLastCheck
    ? getTimeStringByUTC(dateLastCheck, 'DD.MM.YYYY')
    : '-';
  const preparedDateLastTransmissionOfReading = dateLastTransmissionOfReading
    ? getTimeStringByUTC(dateLastTransmissionOfReading, 'DD.MM.YYYY')
    : '-';
  const preparedColdWaterSupplyСonsumption = prepareSupplyConsumption(
    coldWaterSupplyСonsumption
  );
  const preparedHotWaterSupplyСonsumption = prepareSupplyConsumption(
    hotWaterSupplyСonsumption
  );
  const preparedElectricitySupplyСonsumption = prepareSupplyConsumption(
    electricitySupplyСonsumption
  );

  return (
    <Wrapper to={`/objects/${housingStockId}/apartments/${apartmentId}`}>
      <ApartmentNumberWrapper>{apartmentNumber}</ApartmentNumberWrapper>
      <ConsumptionWrapper>
        {preparedColdWaterSupplyСonsumption}
      </ConsumptionWrapper>
      <ConsumptionWrapper>
        {preparedHotWaterSupplyСonsumption}
      </ConsumptionWrapper>
      <ConsumptionWrapper>
        {preparedElectricitySupplyСonsumption}
      </ConsumptionWrapper>
      <div>{preparedDateLastTransmissionOfReading}</div>
      <div>{preparedLastCheckDate}</div>
      <HomeownerInfoWrapper>
        <HomeownerNameWrapper>
          <Tooltip title={homeownerAccountFullName}>
            {homeownerAccountFullName}
          </Tooltip>
        </HomeownerNameWrapper>

        <HomeownerNumberWrapper>
          <Tooltip title={homeownerAccountPhoneNumber || '-'}>
            {homeownerAccountPhoneNumber || '-'}
          </Tooltip>
        </HomeownerNumberWrapper>
      </HomeownerInfoWrapper>
    </Wrapper>
  );
};
