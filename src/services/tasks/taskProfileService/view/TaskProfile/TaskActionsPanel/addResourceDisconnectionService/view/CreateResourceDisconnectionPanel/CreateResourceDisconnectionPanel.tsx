import React, { FC } from 'react';
import {
  DisconnectionWrapper,
  Wrapper,
} from './CreateResourceDisconnectionPanel.styled';
import { Props } from './CreateResourceDisconnectionPanel.types';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { DisablingResourceItem } from 'services/settings/resourcesDisablingScheduleService/views/DisablingResourcesList/DisablingResourceItem/DisablingResourceItem';
import {
  ETaskConfirmationType,
  ResourceDisconnectingResponse,
} from 'api/types';
import { Trash } from 'react-bootstrap-icons';

export const CreateResourceDisconnectionPanel: FC<Props> = ({
  openCreateDisconnectionModal,
  pushStageRequest,
  handleRemove,
}) => {
  if (
    pushStageRequest?.taskConfirmation?.type !== ETaskConfirmationType.Confirm
  )
    return null;

  const createDisconnectionRequestPayload =
    pushStageRequest.resourceDisconnecting;

  return (
    <Wrapper>
      {!createDisconnectionRequestPayload && (
        <Button onClick={openCreateDisconnectionModal}>
          Создать отключение ресурса
        </Button>
      )}
      {createDisconnectionRequestPayload && (
        <FormItem label="Отключение ресурса">
          <DisconnectionWrapper>
            <DisablingResourceItem
              disconnection={
                createDisconnectionRequestPayload as unknown as ResourceDisconnectingResponse
              }
              openModal={() => void 0}
              key={0}
              isMinimized
              handleOpenCompleteDisconnectionModal={() => void 0}
              handleOpenDeleteDisconnectionModal={() => void 0}
              handleOpenEditDisconnectionModal={() => void 0}
              isPermitionToChangeResourceDisabling={false}
            />
            <Trash style={{ cursor: 'pointer' }} onClick={handleRemove} />
          </DisconnectionWrapper>
        </FormItem>
      )}
    </Wrapper>
  );
};
