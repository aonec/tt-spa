import React from 'react';
import moment from 'moment';
import { Popover } from 'antd';
import { ContextMenuButton } from '01/shared/ui/ContextMenuButton';
import { Color } from 'ui-kit/InvisibleContextMenuButton/InvisibleContextMenuButton.types';
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
import { ResourceInfo } from 'ui-kit/shared_components/ResourceInfo';

export const DisablingResourceItem: React.FC<RenderApartmentProps> = ({
  disconnection,
  openModal,
  handleOpenCompleteDisconnectionModal,
  handleOpenDeleteDisconnectionModal,
  handleOpenEditDisconnectionModal,
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
