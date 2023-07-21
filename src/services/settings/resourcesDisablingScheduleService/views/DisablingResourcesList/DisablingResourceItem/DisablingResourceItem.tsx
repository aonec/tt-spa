import React from 'react';
import moment from 'moment';
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
import { ResourceDisconnectingClassLookUp } from '../../DisablingResourcesSearchHeader/DisablingResourcesSearchHeader.utils';
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
            {moment(startDate).format('DD.MM.YYYY')}
          </StyledFontLarge>
          <span>{moment(startDate).format('HH:mm')}</span>
        </TimeElement>
        {endDate && (
          <>
            -
            <TimeElement>
              <StyledFontLarge>
                {moment(endDate).format('DD.MM.YYYY')}
              </StyledFontLarge>
              <span>{moment(endDate).format('HH:mm')}</span>
            </TimeElement>
          </>
        )}
      </GroupWrapper>

      <GroupWrapper>
        <ResourceInfo resource={resource} />
      </GroupWrapper>

      <StyledLinkTypeElement onClick={() => openModal(disconnection)}>
        {(buildings &&
          declOfNum(buildings?.length, ['адрес', 'адреса', 'адресов'])) ||
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
