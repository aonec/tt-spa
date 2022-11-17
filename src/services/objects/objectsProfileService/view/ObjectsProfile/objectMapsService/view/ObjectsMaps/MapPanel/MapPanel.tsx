import React, { FC, useState } from 'react';
import { SearchIcon } from 'ui-kit/icons';
import { InputSC } from '01/shared/ui/Fields';
import {
  SearchResultItem,
  SearchResultWrapper,
  Wrapper,
} from './MapPanel.styled';
import { MapPanelProps } from './MapPanel.types';
import { countSimilarityPoints, getAddressSearchData } from './MapPanel.utils';
import { fromEnter } from '01/shared/ui/DatePickerNative';
import { Skeleton } from 'antd';
import { HousingStock } from './HousingStock';

export const MapPanel: FC<MapPanelProps> = ({
  streetsData,
  handleClickHousingStock,
  isLoadingHousingStock,
  housingStock,
  clearHosuingStock,
}) => {
  const [addressSearch, setAddressSearch] = useState('');

  const addressData = getAddressSearchData(streetsData);

  const pagedFilteredAddressData = addressSearch
    ? addressData
        ?.filter((elem) =>
          Boolean(countSimilarityPoints(addressSearch, elem.addressString))
        )
        ?.sort((a, b) => {
          const aPoints = countSimilarityPoints(addressSearch, a.addressString);
          const bPoints = countSimilarityPoints(addressSearch, b.addressString);

          if (aPoints < bPoints) return 1;

          if (aPoints > bPoints) return -1;

          return 0;
        })
        .slice(0, 5) || []
    : [];

  function handleChooseHousingStock(id?: number) {
    if (!id) return;

    handleClickHousingStock(id);
    setAddressSearch('');
  }

  const search = (
    <>
      {Boolean(pagedFilteredAddressData.length) && (
        <SearchResultWrapper>
          {pagedFilteredAddressData.map((elem) => (
            <SearchResultItem onClick={() => handleChooseHousingStock(elem.id)}>
              {elem.addressString}
            </SearchResultItem>
          ))}
        </SearchResultWrapper>
      )}
      <InputSC
        value={addressSearch}
        onChange={(e) => setAddressSearch(e.target.value)}
        prefix={<SearchIcon />}
        placeholder="Введите адрес"
        onKeyDown={fromEnter(() =>
          handleChooseHousingStock(pagedFilteredAddressData[0]?.id)
        )}
      />
    </>
  );

  return (
    <Wrapper isWithPaddings={!housingStock}>
      {!housingStock && search}
      {isLoadingHousingStock && <Skeleton active />}
      {!isLoadingHousingStock && housingStock && (
        <HousingStock
          clearHosuingStock={clearHosuingStock}
          housingStock={housingStock}
        />
      )}
    </Wrapper>
  );
};
