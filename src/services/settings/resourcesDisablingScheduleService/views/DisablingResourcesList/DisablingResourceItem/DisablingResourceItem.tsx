import React from 'react';
import dayjs from 'api/dayjs';
import { Popover } from 'antd';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton/ContextMenuButton';
import {
  GroupWrapper,
  StyledGridTableBody,
  SenderColumn,
  StyledLinkTypeElement,
  StyledTextElement,
  SenderWrapper,
} from './DisablingResourceItem.styles';
import { StyledFontLarge, TimeElement } from '../DisablingResoucesList.styles';
import { declOfNum } from '../DisablingResourcesList.utils';
import { RenderApartmentProps } from './DisablingResourceItem.types';
import { ResourceInfo } from 'ui-kit/shared/ResourceInfo';
import { ContextMenuButtonColor } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';

export const DisablingResourceItem: React.FC<RenderApartmentProps> = ({
  disconnection,
  openModal,
  handleOpenCompleteDisconnectionModal,
  handleOpenDeleteDisconnectionModal,
  handleOpenEditDisconnectionModal,
  isPermitionToChangeResourceDisabling,
  isMinimized,
}) => {
  const {
    disconnectingType,
    endDate,
    heatingStation,
    buildings,
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
            {dayjs(startDate).format('DD.MM.YYYY')}
          </StyledFontLarge>
          <span>{dayjs(startDate).format('HH:mm')}</span>
        </TimeElement>
        {endDate && (
          <>
            -
            <TimeElement>
              <StyledFontLarge>
                {dayjs(endDate).format('DD.MM.YYYY')}
              </StyledFontLarge>
              <span>{dayjs(endDate).format('HH:mm')}</span>
            </TimeElement>
          </>
        )}
      </GroupWrapper>

      <GroupWrapper>
        <ResourceInfo resource={resource} />
      </GroupWrapper>

      <StyledLinkTypeElement onClick={() => openModal(disconnection)}>
        {!isMinimized &&
          ((buildings &&
            declOfNum(buildings?.length, ['адрес', 'адреса', 'адресов'])) ||
            'Не указан')}
      </StyledLinkTypeElement>

      <StyledTextElement>
        {!isMinimized && (heatingStation?.name || 'Нет')}
      </StyledTextElement>
      <StyledTextElement>{disconnectingType?.description}</StyledTextElement>

      <SenderColumn>
        <Popover content={sender}>
          <SenderWrapper>{sender}</SenderWrapper>
        </Popover>
        {isPermitionToChangeResourceDisabling && (
          <div onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
            <ContextMenuButton
              menuButtons={[
                {
                  title: 'Редактировать отключение',
                  onClick: () => handleOpenEditDisconnectionModal(id),
                },
                {
                  title: 'Завершить отключение',
                  onClick: () =>
                    handleOpenCompleteDisconnectionModal({
                      id,
                      endDate: endDate || '',
                    }),
                },
                {
                  title: 'Удалить отключение',
                  onClick: () =>
                    handleOpenDeleteDisconnectionModal({
                      id,
                      endDate: endDate || '',
                    }),
                  color: ContextMenuButtonColor.danger,
                },
              ]}
              size="small"
            />
          </div>
        )}
      </SenderColumn>
    </StyledGridTableBody>
  );
};
