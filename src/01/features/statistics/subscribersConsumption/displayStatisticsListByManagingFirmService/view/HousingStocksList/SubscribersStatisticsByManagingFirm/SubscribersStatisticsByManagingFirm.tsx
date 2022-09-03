import React, { FC, useMemo } from 'react';
import {
  ColumnNameWrapper,
  HeaderWrapper,
} from './SubscribersStatisticsByManagingFirm.styled';
import { SubscribersStaticsByManagingFirmProps } from './SubscribersStatisticsByManagingFirm.types';
import { SubscribersStaticsByManagingFirmItem } from './SubscribersStatisticsItem';

export const SubscribersStaticsByManagingFirm: FC<SubscribersStaticsByManagingFirmProps> = ({
  apartmentsStatistic,
}) => {
  const list = useMemo(
    () =>
      apartmentsStatistic.map((statistic) => (
        <SubscribersStaticsByManagingFirmItem
          statistic={statistic}
          key={statistic.apartmentId}
        />
      )),
    [apartmentsStatistic]
  );

  return (
    <div>
      <HeaderWrapper>
        <ColumnNameWrapper>№</ColumnNameWrapper>
        <ColumnNameWrapper>ХВС</ColumnNameWrapper>
        <ColumnNameWrapper>ГВС</ColumnNameWrapper>
        <ColumnNameWrapper>ЭЭ</ColumnNameWrapper>
        <ColumnNameWrapper>Дата последней передачи показаний</ColumnNameWrapper>
        <ColumnNameWrapper>Дата последней проверки</ColumnNameWrapper>
        <ColumnNameWrapper>Абонент</ColumnNameWrapper>
      </HeaderWrapper>
      {list}
    </div>
  );
};
