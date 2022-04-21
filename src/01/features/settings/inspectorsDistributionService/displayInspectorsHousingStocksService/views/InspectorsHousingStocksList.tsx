import { TypeAddressToStart } from '01/shared/ui/TypeToStart';
import { Skeleton } from 'antd';
import React, { FC } from 'react';
import { HousingStockItemContainer } from '../inspectorHousingStockService/HousingStockItemContainer';
import { LoaderWrap, Wrap } from './components';
import { InspectorsHosuingsStocksListProps } from './types';

export const InspectorsHousingStocksList: FC<InspectorsHosuingsStocksListProps> = ({
  housingStocks,
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
        housingStocks.map((elem) => <HousingStockItemContainer housingStock={elem} />)
      ) : (
        <TypeAddressToStart />
      )}
    </>
  );

  return <Wrap>{loading ? loader : list}</Wrap>;
};
