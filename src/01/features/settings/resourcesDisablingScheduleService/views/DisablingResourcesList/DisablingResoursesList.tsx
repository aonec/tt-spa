import React from 'react';
import { Divider, Skeleton, Space } from 'antd';
import { PaginationSC } from 'services/objects/displayPersonalNumbersListService/displayPersonalNumberListSevice.styled';
import { Wrap } from './DisablingResoucesList.styles';
import { DisablingListProps } from './DisablingResourcesList.types';
import { RenderApartment } from './DisablingResourceItem/DisablingResourceItem';

export const DisablingResourcesList: React.FC<DisablingListProps> = ({
  resources,
  loading,
  setPage,
  openModal,
}) => {
  const items = resources?.items || [];

  return (
    <>
      <Wrap>
        <div>Период отключения</div>
        <Divider type="vertical" />
        <div>Ресурс</div>
        <Divider type="vertical" />
        <div>Адреса</div>
        <Divider type="vertical" />
        <div>ЦТП</div>
        <Divider type="vertical" />
        <div>Класс</div>
        <Divider type="vertical" />
        <div>Отправитель</div>
        <Divider type="vertical" />
      </Wrap>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <div>
            {items.map((el) => {
              return <RenderApartment {...el} openModal={openModal} />;
            })}
          </div>

          <Space style={{ margin: '10px' }}>
            <PaginationSC
              onChange={setPage}
              pageSize={resources?.pageSize || 5}
              total={resources?.totalItems}
              current={resources?.pageNumber}
              showSizeChanger={false}
            />
          </Space>
        </>
      )}
    </>
  );
};
