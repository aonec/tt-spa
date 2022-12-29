import {
  $inspector,
  fetchInspectorFx,
  InspectorGate,
} from '01/features/Inspectors/models';
import { Flex } from '01/shared/ui/Layout/Flex';
import { useStore } from 'effector-react';
import React from 'react';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { HouseBannerProps } from './HouseBanner.types';
import { Block, Title, Wrapper } from './HouseBanner.styled';

export const HouseBanner: React.FC<HouseBannerProps> = ({ house }) => {
  const inspector = useStore($inspector);
  const pendingInspector = useStore(fetchInspectorFx.pending);

  return (
    <>
      {house.inspectorId && <InspectorGate id={house.inspectorId} />}
      <Title>{getHousingStockAddress(house)}</Title>
      <Wrapper>
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
            title="День снятия показаний"
            value={String(house.inspectedDay)}
          />
        </Flex>
      </Wrapper>
    </>
  );
};
