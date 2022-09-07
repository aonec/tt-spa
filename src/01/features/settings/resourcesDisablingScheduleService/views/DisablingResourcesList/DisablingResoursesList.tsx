import React from 'react';
import moment from 'moment';
import { Divider, Popover, Skeleton, Space } from 'antd';
import { ResourceDisconnectingResponse } from 'myApi';
import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import DeviceIcons from '01/_components/DeviceIcons';
import { StockIconTT } from '01/_pages/Devices/components/DeviceBlock/DeviceBlock';
import { PaginationSC } from 'services/objects/displayPersonalNumbersListService/displayPersonalNumberListSevice.styled';
import { ResourceLookUp } from 'services/tasks/tasksProfileService/tasksProfileService.types';
import { Color } from 'ui-kit/InvisibleContextMenuButton/InvisibleContextMenuButton.types';
import {
  StyledFontLarge,
  StyledLinkTypeElement,
  StyledTextElement,
  TimeElement,
  Wrap,
} from './DisablingResoucesList.styles';
import { ApartmentWrap } from './DisablingResoucesList.styles';
import { DisablingListProps } from './DisablingResourcesList.types';
import { declOfNum } from './DisablingResourcesList.utils';

const layout = {
  temp:
    '3.1fr 0.01fr 1.4fr 0.01fr 0.8fr 0.01fr 0.5fr 0.01fr 1.1fr 0.01fr 1.3fr 0.1fr 0.2fr',
  gap: '10px',
};
const layout2 = {
  temp: '3fr 1.7fr 1.1fr 0.8fr 1.6fr 1.3fr 0.4fr',
  gap: '17px',
};

export const DisablingResourcesList: React.FC<DisablingListProps> = ({
  resources,
  loading,
  setPage,
  openModal,
}) => {
  const temporaryOnClick = () => {
    return void 0;
  };

  const renderApartment = ({
    id,
    resource,
    disconnectingType,
    startDate,
    endDate,
    sender,
    heatingStation,
    housingStocks,
  }: ResourceDisconnectingResponse) => {
    const { icon, color } = DeviceIcons[resource] || {};

    return (
      <ApartmentWrap {...layout2} key={id}>
        <Space align="center">
          <TimeElement>
            <StyledFontLarge>
              {moment(startDate).format('DD.MM.YYYY')}
            </StyledFontLarge>
            <span>{moment(startDate).format('hh:mm')}</span>
          </TimeElement>{' '}
          -
          <TimeElement>
            <StyledFontLarge>
              {moment(endDate).format('DD.MM.YYYY')}
            </StyledFontLarge>
            <span>{moment(endDate).format('hh:mm')}</span>
          </TimeElement>
        </Space>
        <Space align="center">
          <StockIconTT icon={icon} fill={color} dark />
          <StyledTextElement>{ResourceLookUp[resource]}</StyledTextElement>
        </Space>

        <Space align="center">
          <StyledLinkTypeElement onClick={openModal}>
            <p>
              {(housingStocks &&
                declOfNum(housingStocks?.length, [
                  'адрес',
                  'адреса',
                  'адресов',
                ])) ||
                'Не указан'}{' '}
            </p>
          </StyledLinkTypeElement>
        </Space>
        <Space align="center">
          <StyledTextElement>{heatingStation?.name || 'Нет'}</StyledTextElement>
        </Space>
        <Space align="center">
          <StyledTextElement>
            {disconnectingType?.description}
          </StyledTextElement>
        </Space>
        <Popover content={sender}>
          <Space align="center">
            <StyledTextElement>
              <p>{sender}</p>
            </StyledTextElement>
          </Space>
        </Popover>
        <Space align="end" direction="vertical">
          <div onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
            <ContextMenuButton
              menuButtons={[
                {
                  title: 'Редактировать отключение',
                  onClick: temporaryOnClick,
                },
                {
                  title: 'Завершить отключение',
                  onClick: temporaryOnClick,
                },
                {
                  title: 'Удалить отключение',
                  onClick: temporaryOnClick,
                  color: 'red' as Color,
                },
              ]}
              size="small"
            />
          </div>
        </Space>
      </ApartmentWrap>
    );
  };
  const items = resources?.items || [];

  return (
    <>
      <Wrap {...layout}>
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
          <div>{items.map(renderApartment)}</div>
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
