import React, { FC, useCallback, useMemo, useRef } from 'react';
import {
  addressesCountTexts,
  selectedCountTexts,
} from 'services/reportsService/reportViewService/view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.constants';
import { TreeSelectValue } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionForm/CreateResourceDisconnectionForm.types';
import { getAllHousingStocks } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionForm/CreateresourceDisconnectionForm.utils';
import { TreeSelect } from 'ui-kit/TreeSelect';
import { getCountText } from 'utils/getCountText';
import { AddressTreeSelectProps } from './AddressTreeSelect.types';

export const AddressTreeSelect: FC<AddressTreeSelectProps> = ({
  treeData,
  onChange,
  selectedHousingStockIds,
  disabled = false,
}) => {
  const isAllPrevious = useRef(false);
  const isAllHousingStocksSelected = selectedHousingStockIds.includes(-1);

  const allHousingStocks = useMemo(
    () => getAllHousingStocks(treeData),
    [treeData],
  );

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
        return onChange([...allHousingStocks, -1]);
      }

      if (!isAllSelected && isAllPrevious.current) {
        isAllPrevious.current = false;
        return onChange([]);
      }
      isAllPrevious.current = false;

      onChange(
        selectedAddressesArray
          .filter((elem) => elem !== -1)
          .map((elem) => Number(elem)),
      );
    },
    [allHousingStocks, onChange],
  );

  return (
    <TreeSelect
      showSearch
      showArrow
      value={selectedHousingStockIds}
      disabled={disabled}
      treeCheckable
      maxTagCount={0}
      maxTagPlaceholder={() => {
        if (isAllHousingStocksSelected) {
          return 'Выбраны все адреса';
        }
        const addressesCountText = getCountText(
          selectedHousingStockIds.length,
          addressesCountTexts,
        );

        const selectedCountText = getCountText(
          selectedHousingStockIds.length,
          selectedCountTexts,
        );

        return `${selectedCountText} ${selectedHousingStockIds.length} ${addressesCountText}`;
      }}
      treeData={[{ title: 'Все дома', value: -1, key: -1 }, ...treeData]}
      showCheckedStrategy="SHOW_CHILD"
      onChange={(values) => handleChangeHousingStocks(values)}
      placeholder="Выберите адрес"
    />
  );
};
