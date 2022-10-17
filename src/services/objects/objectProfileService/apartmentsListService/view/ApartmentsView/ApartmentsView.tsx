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
}) => {
  const [currentSegment, setCurrentSegment] = useState<SegmentType>('list');

  const ViewComponent = components[currentSegment];

  return (
    <div>
      <HeaderWrapper>
        <HeaderTitle>Список квартир</HeaderTitle>
        <Segmented<SegmentType>
          active={currentSegment}
          items={[
            {
              name: 'list',
              icon: <ListIcon />,
            },
            {
              name: 'cells',
              icon: <CellsIcon />,
            },
          ]}
          onChange={setCurrentSegment}
        />
      </HeaderWrapper>
      {isLoading && <Skeleton active />}
      {!isLoading && apartmentsPagedList && <ViewComponent />}
      {!isLoading && !apartmentsPagedList && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};
