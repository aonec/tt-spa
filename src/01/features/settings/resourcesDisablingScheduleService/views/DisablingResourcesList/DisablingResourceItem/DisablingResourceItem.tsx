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
  StyledLinkTypeElement,
  StyledTextElement,
  SenderWrapper,
} from './DisablingResourceItem.styles';
import { StyledFontLarge, TimeElement } from '../DisablingResoucesList.styles';
import { declOfNum } from '../DisablingResourcesList.utils';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { ResourceDisconnectingClassLookUp } from '../../DisablingResourcesSearchHeader/DisablingResourcesSearchHeader.utils';
import { RenderApartmentProps } from './DisablingResourceItem.types';

export const DisablingResourceItem: React.FC<RenderApartmentProps> = ({
  disconnection,
  openModal,
  handleOpenCompleteDisconnectionModal,
  handleOpenDeleteDisconnectionModal,
}) => {
  const {
    disconnectingType,
    endDate,
    heatingStation,
    housingStocks,
    resource,
    sender,
    startDate,
    id,
  } = disconnection;

  return (
    <StyledGridTableBody>
      <GroupWrapper>
        <TimeElement>
          <StyledFontLarge>
            {moment(startDate).format('DD.MM.YYYY')}
          </StyledFontLarge>
          <span>{moment(startDate).format('hh:mm')}</span>
        </TimeElement>
        {endDate && (
          <>
            -
            <TimeElement>
              <StyledFontLarge>
                {moment(endDate).format('DD.MM.YYYY')}
              </StyledFontLarge>
              <span>{moment(endDate).format('hh:mm')}</span>
            </TimeElement>
          </>
        )}
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
      <StyledTextElement>
        {ResourceDisconnectingClassLookUp[disconnectingType?.value!]}
      </StyledTextElement>

      <SenderColumn>
        <Popover content={sender}>
          <SenderWrapper>{sender}</SenderWrapper>
        </Popover>
        <div onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
          <ContextMenuButton
            menuButtons={[
              {
                title: 'Редактировать отключение',
                onClick: () => void 0,
              },
              {
                title: 'Завершить отключение',
                onClick: () => handleOpenCompleteDisconnectionModal(id),
              },
              {
                title: 'Удалить отключение',
                onClick: () => handleOpenDeleteDisconnectionModal(id),
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
