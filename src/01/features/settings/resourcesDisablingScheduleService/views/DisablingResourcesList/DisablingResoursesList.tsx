import React, { useMemo } from 'react';
import { Divider, Pagination, Skeleton, Space } from 'antd';
import {
  GroupWrapper,
  PaginationWrapper,
  Wrap,
} from './DisablingResoucesList.styles';
import { DisablingListProps } from './DisablingResourcesList.types';
import { DisablingResourceItem } from './DisablingResourceItem/DisablingResourceItem';

export const DisablingResourcesList: React.FC<DisablingListProps> = ({
  resources,
  loading,
  setPage,
  openModal,
}) => {
  const items = resources?.items || [];

  const list = useMemo(() => {
    if (loading) {
      return <Skeleton active />;
    }
    return (
      <>
        <div>
          {items.map((resourceDisconnection) => {
            return (
              <DisablingResourceItem
                disconnection={resourceDisconnection}
                openModal={openModal}
                key={resourceDisconnection.id}
              />
            );
          })}
        </div>
        <PaginationWrapper>
          <Pagination
            onChange={setPage}
            pageSize={resources?.pageSize || 5}
            total={resources?.totalItems}
            current={resources?.pageNumber}
            showSizeChanger={false}
          />
        </PaginationWrapper>
      </>
    );
  }, [loading, setPage, openModal, resources]);

  return (
    <>
      <Wrap>
        <GroupWrapper>
          <div>Период отключения</div>
          <Divider type="vertical" />
        </GroupWrapper>
        <GroupWrapper>
          <div>Ресурс</div>
          <Divider type="vertical" />
        </GroupWrapper>
        <GroupWrapper>
          <div>Адреса</div>
          <Divider type="vertical" />
        </GroupWrapper>
        <GroupWrapper>
          <div>ЦТП</div>
          <Divider type="vertical" />
        </GroupWrapper>
        <GroupWrapper>
          <div>Класс</div>
          <Divider type="vertical" />
        </GroupWrapper>
        <GroupWrapper>
          <div>Отправитель</div>
        </GroupWrapper>
      </Wrap>
      {list}
    </>
  );
};
