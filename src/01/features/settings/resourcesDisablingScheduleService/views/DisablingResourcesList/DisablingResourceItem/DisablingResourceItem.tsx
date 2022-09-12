import React from 'react';
import moment from 'moment';
import { Popover, Space } from 'antd';
import { ResourceDisconnectingResponse } from 'myApi';
import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import DeviceIcons from '01/_components/DeviceIcons';
import { StockIconTT } from '01/_pages/Devices/components/DeviceBlock/DeviceBlock';
import { ResourceLookUp } from 'services/tasks/tasksProfileService/tasksProfileService.types';
import { Color } from 'ui-kit/InvisibleContextMenuButton/InvisibleContextMenuButton.types';
import { StyledGridTableBody } from './DisablingResourceItem.styles'
import {
  StyledFontLarge,
  StyledLinkTypeElement,
  StyledTextElement,
  TimeElement,
} from '../DisablingResoucesList.styles';
import { declOfNum } from '../DisablingResourcesList.utils';

interface Props {
  openModal: () => void;
}

type TypeUnion = ResourceDisconnectingResponse & Props;

export const RenderApartment: React.FC<TypeUnion> = ({
  id,
  resource,
  disconnectingType,
  startDate,
  endDate,
  sender,
  heatingStation,
  housingStocks,
  openModal,
}) => {
  const { icon, color } = DeviceIcons[resource] || {};

  const temporaryOnClick = () => {
    return void 0;
  };

  return (
    <StyledGridTableBody>
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
        <StyledTextElement>{disconnectingType?.description}</StyledTextElement>
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
    </StyledGridTableBody>
  );
};
