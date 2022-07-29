import React from 'react';
import styled from 'styled-components';
import { useStore } from '../../../../../node_modules/effector-react';
import { Search } from './components/Search';
import { StatisticsList } from './components/StatisticsList';
import {
  $selectedHousingsStockId,
  ConsumptionStatisticsGate,
  subscribersConsumptionFilterForm,
} from './models';
import { useForm } from 'effector-forms';
import { Space } from '../../../shared/ui/Layout/Space/Space';

export const SubscribersConsumption = () => {
  const id = useStore($selectedHousingsStockId);
  const { fields } = useForm(subscribersConsumptionFilterForm);
  return (
    <Wrap>
      {id && (
        <ConsumptionStatisticsGate
          HousingStockId={id}
          MonthOfLastTransmission={fields.lastReadingMonth.value || undefined}
          Electricity={true}
          ColdWaterSupply={true}
          HotWaterSupply={true}
        />
      )}
      <Search />
      <Space />
      <StatisticsList />
    </Wrap>
  );
};

const Wrap = styled.div`
  max-width: 960px;
  margin: 5px 0px 10px 0px;
`;
