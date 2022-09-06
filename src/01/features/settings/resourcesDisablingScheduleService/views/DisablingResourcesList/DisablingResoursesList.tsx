import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import { PendingLoader } from '01/shared/ui/PendingLoader';
import DeviceIcons from '01/_components/DeviceIcons';
import { StockIconTT } from '01/_pages/Devices/components/DeviceBlock/DeviceBlock';
import { Divider, Skeleton, Space } from 'antd';
import moment from 'moment';
import {
  ResourceDisconnectingResponse,
  ResourceDisconnectingResponsePagedList,
} from 'myApi';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PaginationSC } from 'services/objects/displayPersonalNumbersListService/displayPersonalNumberListSevice.styled';
import { ResourceLookUp } from 'services/tasks/tasksProfileService/tasksProfileService.types';
import { Color } from 'ui-kit/InvisibleContextMenuButton/InvisibleContextMenuButton.types';
import {
  StyledFontLarge,
  StyledTextElement,
  TimeElement,
  Wrap,
} from './DisablingResoucesList.styles';
import { ApartmentWrap } from './DisablingResoucesList.styles';

const layout = {
  temp:
    '3.2fr 0.01fr 1.3fr 0.01fr 1fr 0.01fr 0.6fr 0.01fr 1fr 0.01fr 1fr 0.1fr 0.3fr',
  gap: '10px',
};
const layout2 = {
  temp: '2.8fr 1.7fr 1.2fr 0.8fr 1.6fr 1.2fr 0.4fr',
  gap: '20px',
};

export const DisablingResourcesList: React.FC<{
  resources: ResourceDisconnectingResponsePagedList | null;
  loading: boolean;
  setPage: (payload: number) => void;
}> = ({ resources, loading, setPage }) => {
  const temporaryOnClick = () => {
    return void 0;
  };
  console.log(resources);
  const history = useHistory();

  const renderApartment = ({
    id,
    resource,
    disconnectingType,
    startDate,
    endDate,
    sender,
    heatingStation,
    managementFirmId,
    housingStocks,
  }: ResourceDisconnectingResponse) => {
    const { icon, color } = DeviceIcons[resource] || {};

    return (
      <ApartmentWrap
        {...layout2}
        onClick={() => history.push(`disabledResources/${id}`)}
        key={id}
      >
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
          <StyledTextElement>
            {(housingStocks && housingStocks?.length) || 'Не указан'}{' '}
          </StyledTextElement>
        </Space>
        <Space align="center">
          <StyledTextElement>{heatingStation?.name || 'Нет'}</StyledTextElement>
        </Space>
        <Space align="center">
          <StyledTextElement>
            {disconnectingType?.description}
          </StyledTextElement>
        </Space>
        <Space align="center">
          <StyledTextElement>{sender}</StyledTextElement>
        </Space>
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
              // defaultCurrent={1}
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
