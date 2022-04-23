import { TypeAddressToStart } from '01/shared/ui/TypeToStart';
import { Skeleton } from 'antd';
import React, { FC } from 'react';
import { HousingStockItem } from '../inspectorHousingStockService/views/HousingStockItem';
import { LoaderWrap, Wrap } from './components';
import { InspectorsHosuingsStocksListProps } from './types';

export const InspectorsHousingStocksList: FC<InspectorsHosuingsStocksListProps> = ({
  housingStocks,
  inspectors,
  days,
  updateHousingStock,
  updates,
  loading,
}) => {
  const loader = (
    <LoaderWrap>
      <Skeleton active />
    </LoaderWrap>
  );

  const list = (
    <>
      {housingStocks ? (
        housingStocks.map((housingStock) => {
          const update = updates.find(
            (elem) => elem.housingStockId === housingStock.housingStockId
          );
          return (
            <HousingStockItem
              key={housingStock.housingStockId}
              housingStock={housingStock}
              inspectors={inspectors}
              days={days}
              update={update}
              updateHousingStock={(data) =>
                updateHousingStock({
                  housingStockId: housingStock.housingStockId!,
                  data,
                })
              }
            />
          );
        })
      ) : (
        <TypeAddressToStart />
      )}
    </>
  );

  return <Wrap>{loading ? loader : list}</Wrap>;
};
