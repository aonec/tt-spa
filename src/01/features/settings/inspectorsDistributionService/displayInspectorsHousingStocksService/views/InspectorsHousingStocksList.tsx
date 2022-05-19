import { TypeAddressToStart } from '01/shared/ui/TypeToStart';
import { Empty, Skeleton } from 'antd';
import React, { FC, useMemo } from 'react';
import { HousingStockItem } from '../inspectorHousingStockService/views/HousingStockItem/HousingStockItem';
import { LoaderWrap, Wrap } from './InspectorsHousingStocksList.styled';
import { InspectorsHosuingsStocksListProps } from './InspectorsHousingStocksList.types';

export const InspectorsHousingStocksList: FC<InspectorsHosuingsStocksListProps> = ({
  housingStocks,
  inspectors,
  days,
  updateHousingStock,
  updateInfo,
  loading,
}) => {
  const loader = (
    <LoaderWrap>
      <Skeleton active />
    </LoaderWrap>
  );

  const list = housingStocks?.map((housingStock) => {
    const update = updateInfo.find(
      (elem) => elem.housingStockId === housingStock.housingStockId
    );
    return (
      <HousingStockItem
        key={housingStock.housingStockId}
        housingStock={housingStock}
        inspectors={inspectors}
        days={days}
        updateInfo={update}
        updateHousingStock={(data) =>
          updateHousingStock({
            housingStockId: housingStock.housingStockId!,
            data,
          })
        }
      />
    );
  });

  const isHousingStocksListExist = Boolean(housingStocks);
  const isHousingStocksListContainsElems = Boolean(housingStocks?.length);

  const content = useMemo(() => {
    if (!isHousingStocksListExist) {
      return <TypeAddressToStart />;
    }

    if (!isHousingStocksListContainsElems) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    return list;
  }, [
    isHousingStocksListExist,
    isHousingStocksListContainsElems,
    housingStocks,
    updateInfo,
  ]);

  return (
    <Wrap>
      {loading && loader}
      {!loading && content}
    </Wrap>
  );
};
