import Arrow from '01/_components/Arrow/Arrow';
import { Skeleton, Tooltip } from 'antd';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { DownloadIcon } from 'ui-kit/icons';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { SubscribersStaticsByManagingFirm } from '../SubscribersStatisticsByManagingFirm';
import {
  AddressWrapper,
  AppartmentNumberText,
  ArrowWrapper,
  DownloadIconSC,
  DownloadIconWrapper,
  GroupWrapper,
  Wrapper,
} from './HousingStocksListItem.styled';
import { HousingStocksListItemProps } from './HousingStocksListItem.types';

export const HousingStocksListItem: FC<HousingStocksListItemProps> = ({
  housingStock,
  selectHousingStock,
  statisticIsLoading,
  handleOpenModal,
  selectedHousingStock,
}) => {
  const { numberOfApartments, apartmentsStatistic, id } = housingStock;

  const [isActive, setIsActive] = useState(false);
  const toggle = () => setIsActive((prev) => !prev);

  const apartmentsStatisticComponent = useMemo(
    () => (
      <SubscribersStaticsByManagingFirm
        apartmentsStatistic={apartmentsStatistic}
      />
    ),
    [apartmentsStatistic]
  );

  const openModal = useCallback(() => handleOpenModal(id), [
    handleOpenModal,
    id,
  ]);

  const address = getHousingStockAddress(housingStock);
  const isCurrentHousingStockSelected = selectedHousingStock === id;

  useEffect(() => {
    if (!isCurrentHousingStockSelected) {
      setIsActive(false);
    }
  }, [isCurrentHousingStockSelected]);

  return (
    <div>
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
          <Tooltip title="Выгрузить список квартир">
            <DownloadIconWrapper onClick={openModal}>
              <DownloadIconSC />
            </DownloadIconWrapper>
          </Tooltip>
        </GroupWrapper>
      </Wrapper>
      {isActive &&
        isCurrentHousingStockSelected &&
        !statisticIsLoading &&
        apartmentsStatisticComponent}
      {isActive && isCurrentHousingStockSelected && statisticIsLoading && (
        <Skeleton active />
      )}
    </div>
  );
};
