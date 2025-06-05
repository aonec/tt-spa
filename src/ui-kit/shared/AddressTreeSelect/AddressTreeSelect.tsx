import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  addressesCountTexts,
  selectedCountTexts,
} from 'services/reportsService/reportViewService/view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.constants';
import { TreeSelectValue } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionForm/CreateResourceDisconnectionForm.types';
import { getAllHousingStocks } from 'services/resources/createResourceDisconnectionService/view/CreateResourceDisconnectionForm/CreateresourceDisconnectionForm.utils';
import { getCountText } from 'utils/getCountText';
import { TreeSelectSC } from './AddressTreeSelect.styled';
import { AddressTreeSelectProps, TreeKey } from './AddressTreeSelect.types';
import _ from 'lodash';
import { getParents } from './AddressTreeSelect.utils';

export const AddressTreeSelect: FC<AddressTreeSelectProps> = ({
  treeData,
  onChange,
  selectedHousingStockIds,
  placeholder = 'Выберите адрес',
  disabled = false,
  small = false,
  placement,
}) => {
  const isAllPrevious = useRef(false);
  const [expandedNodes, setExpandedNodes] = useState<TreeKey[]>([]);
  const [foundTitle, setFoundTitle] = useState<string | null>(null);

  const allHousingStocks = useMemo(
    () => getAllHousingStocks(treeData),
    [treeData],
  );

  const parents = useMemo(() => getParents(treeData), [treeData]);

  const isAllHousingStocksSelected =
    selectedHousingStockIds.length === allHousingStocks.length;

  const treeSelectValues = useMemo(() => {
    if (isAllHousingStocksSelected) {
      return [...allHousingStocks, -1];
    }
    return selectedHousingStockIds;
  }, [isAllHousingStocksSelected, allHousingStocks, selectedHousingStockIds]);

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
          .map((elem) => Number(elem)),
      );
    },
    [allHousingStocks, onChange],
  );

  useEffect(() => {
    if (foundTitle) {
      const node = document.querySelector(`span[title='${foundTitle}']`);

      node
        ?.closest('.ant-select-tree-list-holder')
        ?.scroll({ left: 0, top: node?.parentElement?.offsetTop || 0 });
    }
  }, [foundTitle]);

  const handleExpandTree = useCallback(
    (keys: TreeKey[]) => {
      const expandedKey = _.first(_.difference(keys, expandedNodes));
      const node = parents.find((elem) => elem.key === expandedKey);
      setFoundTitle(node?.title || null);

      if (node) {
        setExpandedNodes([...node.parents, node.key]);
      } else {
        setExpandedNodes(keys);
      }
    },
    [setExpandedNodes, setFoundTitle, parents, expandedNodes],
  );

  return (
    <TreeSelectSC
      small={small}
      showSearch
      value={treeSelectValues}
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
      onChange={(values) =>
        handleChangeHousingStocks(values as TreeSelectValue)
      }
      placeholder={placeholder}
      onTreeExpand={handleExpandTree}
      virtual={false}
      placement={placement}
      treeExpandedKeys={expandedNodes}
    />
  );
};
