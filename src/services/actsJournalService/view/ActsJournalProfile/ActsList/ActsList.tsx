import React, { FC, useMemo } from 'react';
import { ActsListProps } from './ActsList.types';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { Empty } from 'antd';
import { ActsListItem } from './ActsListItem';
import { PaginationSC } from './ActsList.styled';

export const ActsList: FC<ActsListProps> = ({
  isActsLoading,
  actsPagedData,
  setPageNumber,
  handleOpenDoc,
}) => {
  const list = useMemo(() => {
    if (!actsPagedData?.items) {
      return null;
    }
    return actsPagedData.items.map((act) => (
      <ActsListItem act={act} key={act.id} handleOpenDoc={handleOpenDoc} />
    ));
  }, [actsPagedData]);

  return (
    <WithLoader isLoading={isActsLoading}>
      {actsPagedData && (
        <>
          {list}
          <PaginationSC
            showQuickJumper
            showSizeChanger={false}
            current={actsPagedData.pageNumber}
            total={actsPagedData.totalItems}
            pageSize={actsPagedData.pageSize}
            onChange={(PageNumber) => setPageNumber(PageNumber)}
          />
        </>
      )}
      {!actsPagedData && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет актов" />
      )}
    </WithLoader>
  );
};
