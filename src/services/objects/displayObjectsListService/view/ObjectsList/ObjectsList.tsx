import React, { FC, useMemo } from 'react';
import { HousingStockItem } from './HousingStockItem';
import { ObjectsListProps } from './ObjectsList.types';
import { TypeAddressToStart } from 'ui-kit/shared/TypeToStart';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { NothingFound } from 'ui-kit/shared/NothingFound';

export const ObjectsList: FC<ObjectsListProps> = ({
  isLoading,
  housingStocks,
  isBuildingFetched,
}) => {
  const housingStocksList = useMemo(() => {
    return housingStocks?.map((housingStock) => (
      <HousingStockItem key={housingStock.id} housingStock={housingStock} />
    ));
  }, [housingStocks]);

  const isEmpty = !housingStocks?.length;

  return (
    <div>
      <WithLoader isLoading={isLoading}>
        {housingStocksList}
        {isEmpty && !isBuildingFetched && <TypeAddressToStart />}
        {isEmpty && isBuildingFetched && <NothingFound />}
      </WithLoader>
    </div>
  );
};
