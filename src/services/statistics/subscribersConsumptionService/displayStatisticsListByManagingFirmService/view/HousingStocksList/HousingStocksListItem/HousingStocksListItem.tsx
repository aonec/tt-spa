import { Tooltip } from 'antd';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import {
  AddressWrapper,
  AppartmentNumberText,
  DownloadIconSC,
  DownloadIconWrapper,
  GroupWrapper,
  Wrapper,
} from './HousingStocksListItem.styled';
import { HousingStocksListItemProps } from './HousingStocksListItem.types';
import { StatisticsList } from 'services/statistics/subscribersConsumptionService/displayStatisticsListByHousesService/view/StatisticsList';
import { ListOpeningChevron } from 'ui-kit/shared/ListOpeningChevron';
import { WithLoader } from 'ui-kit/shared/WithLoader';

export const HousingStocksListItem: FC<HousingStocksListItemProps> = ({
  housingStock,
  selectHousingStock,
  statisticIsLoading,
  handleOpenModal,
  selectedHousingStock,
  setFileName,
}) => {
  const { apartmentsStatistic, id, address, numberOfApartments } = housingStock;

  const [isActive, setIsActive] = useState(false);
  const toggle = () => setIsActive((prev) => !prev);

  const openModal = useCallback(
    () => handleOpenModal(id),
    [handleOpenModal, id],
  );

  const addressString = getBuildingAddress(housingStock);
  const isCurrentHousingStockSelected = selectedHousingStock === id;

  const apartmentsStatisticComponent = useMemo(() => {
    const isOpen = isActive && isCurrentHousingStockSelected;
    if (!isOpen) {
      return null;
    }

    return (
      <WithLoader isLoading={statisticIsLoading}>
        <StatisticsList statistics={apartmentsStatistic} />
      </WithLoader>
    );
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
  }, [openModal, address, setFileName]);

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
          <ListOpeningChevron isOpen={isActive} />
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
