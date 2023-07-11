import React, { FC, useMemo } from 'react';
import { HousingStockItem } from './HousingStockItem';
import { ObjectsListProps } from './ObjectsList.types';
import { TypeAddressToStart } from 'ui-kit/shared_components/TypeToStart';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';

export const ObjectsList: FC<ObjectsListProps> = ({
  isLoading,
  housingStocks,
}) => {

  console.log(housingStocks)

  const housingStocksList = useMemo(() => {
    return housingStocks?.map((housingStock) => (
      <HousingStockItem key={housingStock.id} housingStock={housingStock} />
    ));
  }, [housingStocks]);

  const isEmpty = useMemo(() => !housingStocks?.length, [housingStocks]);

  return (
    <div>
      <WithLoader isLoading={isLoading}>
        {housingStocksList}
        {isEmpty && <TypeAddressToStart />}
      </WithLoader>
    </div>
  );
};
