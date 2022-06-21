import { TypeAddressToStart } from '01/shared/ui/TypeToStart';
import { Skeleton } from 'antd';
import React, { FC, useMemo } from 'react';
import { HousingStockItem } from './HousingStockItem';
import { ObjectsListProps } from './ObjectsList.types';

export const ObjectsList: FC<ObjectsListProps> = ({
  isLoading,
  housingStocks,
}) => {
  const housingStocksList = useMemo(() => {
    return housingStocks?.map((housingStock) => (
      <HousingStockItem key={housingStock.id} housingStock={housingStock} />
    ));
  }, [housingStocks]);

  const isEmpty = useMemo(() => !housingStocks?.length, [housingStocks]);

  return (
    <div>
      {isLoading && <Skeleton active />}
      {!isLoading && housingStocksList}
      {isEmpty && !isLoading && <TypeAddressToStart />}
    </div>
  );
};
