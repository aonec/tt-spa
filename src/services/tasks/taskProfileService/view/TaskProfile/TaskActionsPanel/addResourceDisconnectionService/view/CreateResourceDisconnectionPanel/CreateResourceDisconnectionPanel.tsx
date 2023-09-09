import React, { FC } from 'react';
import { Wrapper } from './CreateResourceDisconnectionPanel.styled';
import { Props } from './CreateResourceDisconnectionPanel.types';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { DisablingResourceItem } from 'services/settings/resourcesDisablingScheduleService/views/DisablingResourcesList/DisablingResourceItem/DisablingResourceItem';

export const CreateResourceDisconnectionPanel: FC<Props> = ({
  openCreateDisconnectionModal,
  createDisconnectionRequestPayload,
}) => {
  return (
    <Wrapper>
      {!createDisconnectionRequestPayload && (
        <Button onClick={openCreateDisconnectionModal}>
          Создать отключение ресурса
        </Button>
      )}
      {createDisconnectionRequestPayload && (
        <FormItem label="Отключение ресурса">
          <DisablingResourceItem
            disconnection={createDisconnectionRequestPayload as any}
            openModal={() => void 0}
            key={0}
            handleOpenCompleteDisconnectionModal={() => void 0}
            handleOpenDeleteDisconnectionModal={() => void 0}
            handleOpenEditDisconnectionModal={() => void 0}
            isPermitionToChangeResourceDisabling={false}
          />
        </FormItem>
      )}
    </Wrapper>
  );
};
