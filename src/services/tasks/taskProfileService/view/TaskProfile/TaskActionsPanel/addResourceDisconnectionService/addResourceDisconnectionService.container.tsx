import React, { FC } from 'react';
import { addResourceDisconnectionService } from './addResourceDisconnectionService.models';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { CreateResourceDisconnectionPanel } from './view/CreateResourceDisconnectionPanel';
import { CreateResourceDisconnectionContainer } from 'services/resources/createResourceDisconnectionService';
import { useUnit } from 'effector-react';

const { inputs } = addResourceDisconnectionService;

export const AddResourceDisconnectionContainer: FC<
  ActionComponentProps
> = () => {
  const { openCreateDisconnectionModal } = useUnit({
    openCreateDisconnectionModal: inputs.openCreateDisconnectionModal,
  });

  return (
    <>
      <CreateResourceDisconnectionContainer />
      <CreateResourceDisconnectionPanel
        openCreateDisconnectionModal={openCreateDisconnectionModal}
      />
    </>
  );
};
