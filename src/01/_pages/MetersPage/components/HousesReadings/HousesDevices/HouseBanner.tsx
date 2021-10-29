import {
  $inspector,
  fetchInspectorFx,
  InspectorGate,
} from '01/features/Inspectors/models';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { HousingStockResponse } from '../../../../../../myApi';

const HouseBanner: React.FC<HouseBannerProps> = ({ house }) => {
  const inspector = useStore($inspector);
  const pendingInspector = useStore(fetchInspectorFx.pending);

  return (
    <Wrap>
      {house.inspectorId && <InspectorGate id={house.inspectorId} />}
      <Flex>
        <Block
          title="Контролер"
          value={
            pendingInspector
              ? 'Загрузка...'
              : inspector?.fullName
              ? String(inspector?.fullName)
              : 'Нет данных'
          }
        />
        <Block
          title="Дата снятия показаний"
          value={moment(house.inspectedDay).format('DD.MM.YYYY')}
        />
      </Flex>
    </Wrap>
  );
};

const Block = ({ title, value }: { title: string; value: string }) => {
  return (
    <BlockWrap>
      <BlockTitle>{title}:</BlockTitle>
      <Space h={6} />
      <BlockValue>{value}</BlockValue>
    </BlockWrap>
  );
};

const BlockWrap = styled.div`
  margin-right: 60px;
`;

const BlockTitle = styled.div`
  color: rgba(39, 47, 90, 0.7);
  font-size: 14px;
`;

const BlockValue = styled.div`
  color: rgba(39, 47, 90, 1);
  font-weight: 500;
  font-size: 14px;
`;

const Wrap = styled.div`
  background: rgba(24, 158, 233, 0.08);
  padding: 12px 19px;
  margin: 10px 0 15px;
  border-radius: 8px;
`;

interface HouseBannerProps {
  house: HousingStockResponse;
}

export default HouseBanner;
