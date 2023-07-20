import { Empty, Skeleton } from 'antd';
import React, { FC, useMemo } from 'react';
import { HousingStockItem } from '../inspectorHousingStockService/views/HousingStockItem/HousingStockItem';
import { LoaderWrap, Wrap } from './InspectorsHousingStocksList.styled';
import { InspectorsHosuingsStocksListProps } from './InspectorsHousingStocksList.types';
import { TypeAddressToStart } from 'ui-kit/shared/TypeToStart';

export const InspectorsHousingStocksList: FC<
  InspectorsHosuingsStocksListProps
> = ({
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
      (elem) => elem.housingStockId === housingStock.buildingId,
    );
    return (
      <HousingStockItem
        key={housingStock.buildingId}
        housingStock={housingStock}
        inspectors={inspectors}
        days={days}
        updateInfo={update}
        updateHousingStock={(data) =>
          updateHousingStock({
            housingStockId: housingStock.buildingId!,
            data,
          })
        }
      />
    );
  });

  const content = useMemo(() => {
    const isHousingStocksListExist = Boolean(housingStocks);
    const isHousingStocksListContainsElems = Boolean(housingStocks?.length);

    if (!isHousingStocksListExist) {
      return <TypeAddressToStart />;
    }

    if (!isHousingStocksListContainsElems) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    return list;
  }, [housingStocks, list]);

  return (
    <Wrap>
      {loading && loader}
      {!loading && content}
    </Wrap>
  );
};
