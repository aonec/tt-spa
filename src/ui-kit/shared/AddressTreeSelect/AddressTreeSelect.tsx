import React, { FC, useCallback, useMemo, useRef } from 'react';
import {
  addressesCountTexts,
  selectedCountTexts,
} from 'services/reportsService/reportViewService/view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.constants';
import { TreeSelectValue } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionForm/CreateResourceDisconnectionForm.types';
import { getAllHousingStocks } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionForm/CreateresourceDisconnectionForm.utils';
import { getCountText } from 'utils/getCountText';
import { TreeSelectSC } from './AddressTreeSelect.styled';
import { AddressTreeSelectProps } from './AddressTreeSelect.types';

export const AddressTreeSelect: FC<AddressTreeSelectProps> = ({
  treeData,
  onChange,
  selectedHousingStockIdsHashs,
  placeholder = 'Выберите адрес',
  disabled = false,
  small = false,
}) => {
  const isAllPrevious = useRef(false);

  const allHousingStocks = useMemo(
    () => getAllHousingStocks(treeData),
    [treeData],
  );

  const isAllHousingStocksSelected =
    selectedHousingStockIdsHashs.length === allHousingStocks.length;

  const treeSelectValues = useMemo(() => {
    if (isAllHousingStocksSelected) {
      return [...allHousingStocks, -1];
    }
    return selectedHousingStockIdsHashs;
  }, [
    isAllHousingStocksSelected,
    allHousingStocks,
    selectedHousingStockIdsHashs,
  ]);

  const handleChangeHousingStocks = useCallback(
    (selectedAddresses: TreeSelectValue) => {
      const selectedAddressesArray = [selectedAddresses].flat();

      const allHousingStocksVariantClicked =
        selectedAddressesArray.includes(-1);
      const allHousingStocksChosen =
        selectedAddressesArray.length === allHousingStocks.length &&
        !isAllPrevious.current;

      const isAllSelected =
        allHousingStocksVariantClicked || allHousingStocksChosen;

      if (isAllSelected && !isAllPrevious.current) {
        isAllPrevious.current = true;
        return onChange(allHousingStocks);
      }

      if (!isAllSelected && isAllPrevious.current) {
        isAllPrevious.current = false;
        return onChange([]);
      }
      isAllPrevious.current = false;

      onChange(
        selectedAddressesArray
          .filter((elem) => elem !== -1)
          .map((elem) => String(elem)),
      );
    },
    [allHousingStocks, onChange],
  );

  return (
    <TreeSelectSC
      small={small}
      showSearch
      showArrow
      value={treeSelectValues}
      disabled={disabled}
      treeCheckable
      maxTagCount={0}
      maxTagPlaceholder={() => {
        if (isAllHousingStocksSelected) {
          return 'Выбраны все адреса';
        }
        const addressesCountText = getCountText(
          selectedHousingStockIdsHashs.length,
          addressesCountTexts,
        );

        const selectedCountText = getCountText(
          selectedHousingStockIdsHashs.length,
          selectedCountTexts,
        );

        return `${selectedCountText} ${selectedHousingStockIdsHashs.length} ${addressesCountText}`;
      }}
      treeData={[{ title: 'Все дома', value: -1, key: -1 }, ...treeData]}
      showCheckedStrategy="SHOW_CHILD"
      onChange={(values) => handleChangeHousingStocks(values)}
      placeholder={placeholder}
    />
  );
};
