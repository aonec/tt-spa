import Arrow from '01/_components/Arrow/Arrow';
import { Skeleton } from 'antd';
import React, { FC, useMemo, useState } from 'react';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import {
  AddressWrapper,
  AppartmentNumberText,
  ArrowWrapper,
  GroupWrapper,
  InfoWrapper,
  Wrapper,
} from './HousingStocksListItem.styled';
import { HousingStocksListItemProps } from './HousingStocksListItem.types';

export const HousingStocksListItem: FC<HousingStocksListItemProps> = ({
  housingStock,
  selectHousingStock,
}) => {
  const { numberOfApartments, apartmentsStatistic, id } = housingStock;

  const [isActive, setIsActive] = useState(false);
  const toggle = () => setIsActive((prev) => !prev);


  const isStatisticExist = apartmentsStatistic.length !== 0;
  const address = getHousingStockAddress(housingStock);

  return (
    <InfoWrapper>
      <Wrapper>
        <GroupWrapper
          onClick={() => {
            selectHousingStock(id);
            toggle();
          }}
          className="clickable"
        >
          <ArrowWrapper isActive={isActive}>
            <Arrow />
          </ArrowWrapper>
          <AddressWrapper isActive={isActive}>{address}</AddressWrapper>
        </GroupWrapper>
        <GroupWrapper>
          <AppartmentNumberText>
            Количество квартир: {numberOfApartments}
          </AppartmentNumberText>
        </GroupWrapper>
      </Wrapper>
      {isActive && !isStatisticExist && <Skeleton active />}
    </InfoWrapper>
  );
};
