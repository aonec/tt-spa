import { Empty, Skeleton } from 'antd';
import React, { FC, useState } from 'react';
import { CellsIcon, ListIcon } from 'ui-kit/icons';
import { Segmented } from 'ui-kit/Segmented';
import { components } from './ApartmentsView.constants';
import { HeaderTitle, HeaderWrapper } from './ApartmentsView.styled';
import { ApartmentsViewProps, SegmentType } from './ApartmentsView.types';

export const ApartmentsView: FC<ApartmentsViewProps> = ({
  apartmentsPagedList,
  isLoading,
  hosuingStockId,
  currentSegment,
  setCurrentSegment,
  setCurrentApartmentId,
  currentApartmentId,
  clearCurrentApartmentId,
}) => {
  const ViewComponent = components[currentSegment];

  return (
    <div>
      <HeaderWrapper>
        <HeaderTitle>Список квартир</HeaderTitle>
        <Segmented<SegmentType>
          active={currentSegment}
          items={[
            {
              name: 'cells',
              icon: <CellsIcon />,
            },
            {
              name: 'list',
              icon: <ListIcon />,
            },
          ]}
          onChange={setCurrentSegment}
        />
      </HeaderWrapper>
      {isLoading && <Skeleton active />}
      {!isLoading && apartmentsPagedList?.items && (
        <ViewComponent
          hosuingStockId={hosuingStockId}
          apartments={apartmentsPagedList.items}
          setCurrentApartmentId={setCurrentApartmentId}
          currentApartmentId={currentApartmentId}
          clearCurrentApartmentId={clearCurrentApartmentId}
        />
      )}
      {!isLoading && !apartmentsPagedList && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};
