import { TypeAddressToStart } from '01/shared/ui/TypeToStart';
import { Skeleton } from 'antd';
import { groupBy } from 'lodash';
import React, { FC, useMemo } from 'react';
import { HousingStockItem } from './HousingStockItem';
import { StreetGroupHeader, StreetGroupWrapper } from './ObjectsList.styled';
import { ObjectsListProps } from './ObjectsList.types';

export const ObjectsList: FC<ObjectsListProps> = ({
  isLoading,
  housingStocks,
}) => {
  const groupedHousingStocks = useMemo(() => {
    const grouped = Object.entries(
      groupBy(housingStocks, 'address.mainAddress.street')
    );

    return grouped.map(([street, housingStocks]) => (
      <StreetGroupWrapper>
        <StreetGroupHeader>{street}</StreetGroupHeader>
        {housingStocks?.map((housingStock) => (
          <HousingStockItem key={housingStock.id} housingStock={housingStock} />
        ))}
      </StreetGroupWrapper>
    ));
  }, [housingStocks]);

  const isEmpty = useMemo(() => !housingStocks?.length, [housingStocks]);

  return (
    <div>
      {isLoading && <Skeleton active />}
      {!isLoading && groupedHousingStocks}
      {isEmpty && !isLoading && <TypeAddressToStart />}
    </div>
  );
};
