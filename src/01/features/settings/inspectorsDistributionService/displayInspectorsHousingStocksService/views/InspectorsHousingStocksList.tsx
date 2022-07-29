import { Empty, Skeleton } from 'antd';
import React, { FC, useMemo } from 'react';
import { TypeAddressToStart } from '../../../../../shared/ui/TypeToStart';
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
  }, [housingStocks, updateInfo]);

  return (
    <Wrap>
      {loading && loader}
      {!loading && content}
    </Wrap>
  );
};
