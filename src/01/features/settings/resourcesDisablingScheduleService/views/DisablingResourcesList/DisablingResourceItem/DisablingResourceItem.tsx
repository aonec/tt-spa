import React from 'react';
import moment from 'moment';
import { Popover } from 'antd';
import { ResourceDisconnectingResponse } from 'myApi';
import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import { ResourceLookUp } from 'services/tasks/tasksProfileService/tasksProfileService.types';
import { Color } from 'ui-kit/InvisibleContextMenuButton/InvisibleContextMenuButton.types';
import {
  GroupWrapper,
  StyledGridTableBody,
  ResourceTextWrapper,
  SenderColumn,
} from './DisablingResourceItem.styles';
import {
  SenderWrapper,
  StyledFontLarge,
  StyledLinkTypeElement,
  StyledTextElement,
  TimeElement,
} from '../DisablingResoucesList.styles';
import { declOfNum } from '../DisablingResourcesList.utils';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';

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
  const temporaryOnClick = () => {
    return void 0;
  };

  return (
    <StyledGridTableBody>
      <GroupWrapper>
        <TimeElement>
          <StyledFontLarge>
            {moment(startDate).format('DD.MM.YYYY')}
          </StyledFontLarge>
          <span>{moment(startDate).format('hh:mm')}</span>
        </TimeElement>
        -
        <TimeElement>
          <StyledFontLarge>
            {moment(endDate).format('DD.MM.YYYY')}
          </StyledFontLarge>
          <span>{moment(endDate).format('hh:mm')}</span>
        </TimeElement>
      </GroupWrapper>

      <GroupWrapper>
        <ResourceIconLookup resource={resource} />
        <ResourceTextWrapper>{ResourceLookUp[resource]}</ResourceTextWrapper>
      </GroupWrapper>

      <StyledLinkTypeElement onClick={openModal}>
        {(housingStocks &&
          declOfNum(housingStocks?.length, ['адрес', 'адреса', 'адресов'])) ||
          'Не указан'}{' '}
      </StyledLinkTypeElement>

      <StyledTextElement>{heatingStation?.name || 'Нет'}</StyledTextElement>
      <StyledTextElement>{disconnectingType?.description}</StyledTextElement>

      <SenderColumn>
        <Popover content={sender}>
          <SenderWrapper>{sender}</SenderWrapper>
        </Popover>
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
      </SenderColumn>
    </StyledGridTableBody>
  );
};
