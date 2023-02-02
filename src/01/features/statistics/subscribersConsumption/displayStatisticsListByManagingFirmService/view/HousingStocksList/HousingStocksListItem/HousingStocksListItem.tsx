import Arrow from '01/_components/Arrow/Arrow';
import { Skeleton, Tooltip } from 'antd';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
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
  setFileName,
}) => {
  const { numberOfApartments, apartmentsStatistic, id, address } = housingStock;

  const [isActive, setIsActive] = useState(false);
  const toggle = () => setIsActive((prev) => !prev);

  const openModal = useCallback(
    () => handleOpenModal(id),
    [handleOpenModal, id],
  );

  const addressString = getHousingStockAddress(housingStock);
  const isCurrentHousingStockSelected = selectedHousingStock === id;

  const apartmentsStatisticComponent = useMemo(() => {
    const isOpen = isActive && isCurrentHousingStockSelected;
    if (!isOpen) {
      return null;
    }
    if (statisticIsLoading) {
      return <Skeleton active />;
    }
    if (!statisticIsLoading) {
      return (
        <SubscribersStaticsByManagingFirm
          apartmentsStatistic={apartmentsStatistic}
        />
      );
    }
  }, [
    apartmentsStatistic,
    isCurrentHousingStockSelected,
    isActive,
    statisticIsLoading,
  ]);

  const handleChooseHousingStock = useCallback(() => {
    const mainAddress = address?.mainAddress;
    const street = mainAddress?.street;
    const number = mainAddress?.number;
    if (street && number) {
      setFileName(`${street}_${number}`);
    } else {
      setFileName('');
    }
    openModal();
  }, [openModal, address]);

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
          <AddressWrapper isActive={isActive}>{addressString}</AddressWrapper>
        </GroupWrapper>
        <GroupWrapper>
          <AppartmentNumberText>
            Количество квартир: {numberOfApartments}
          </AppartmentNumberText>
          <Tooltip title="Выгрузить список квартир">
            <DownloadIconWrapper onClick={handleChooseHousingStock}>
              <DownloadIconSC />
            </DownloadIconWrapper>
          </Tooltip>
        </GroupWrapper>
      </Wrapper>
      {apartmentsStatisticComponent}
    </div>
  );
};
