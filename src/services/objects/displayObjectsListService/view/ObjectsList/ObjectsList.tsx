import { Skeleton } from 'antd';
import React, { FC } from 'react';
import { HousingStockItem } from './HousingStockItem';
import { Wrapper } from './ObjectsList.styled';
import { ObjectsListProps } from './ObjectsList.types';

export const ObjectsList: FC<ObjectsListProps> = ({
  isLoading,
  housingStocks,
}) => {
  return (
    <Wrapper>
      {isLoading && <Skeleton />}
      {!isLoading &&
        housingStocks?.map((housingStock) => (
          <HousingStockItem key={housingStock.id} housingStock={housingStock} />
        ))}
    </Wrapper>
  );
};
