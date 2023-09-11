import React, { FC, useEffect, useState } from 'react';
import { addResourceDisconnectionService } from './addResourceDisconnectionService.models';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { CreateResourceDisconnectionPanel } from './view/CreateResourceDisconnectionPanel';
import { CreateResourceDisconnectionContainer } from 'services/resources/createResourceDisconnectionService';
import { useUnit } from 'effector-react';
import { ChooseTypeOfResourceDisconnectionModalContainer } from 'services/resources/chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.container';
import {
  ResourceDisconnectingCreateRequest,
  StagePushRequest,
} from 'api/types';

const { inputs } = addResourceDisconnectionService;

export const AddResourceDisconnectionContainer: FC<ActionComponentProps> = ({
  handleChange,
}) => {
  const [
    createDisconnectionRequestPayload,
    setCreateDisconnectionRequestPayload,
  ] = useState<ResourceDisconnectingCreateRequest | null>(null);

  const [pushStageRequest, setPushStageRequest] =
    useState<StagePushRequest | null>(null);

  const { openCreateDisconnectionModal } = useUnit({
    openCreateDisconnectionModal: inputs.openCreateDisconnectionModal,
  });

  useEffect(() => {
    handleChange({ resourceDisconnecting: createDisconnectionRequestPayload });
  }, [createDisconnectionRequestPayload, handleChange]);

  useEffect(() => {
    handleChange((prev) => {
      setPushStageRequest(prev);
      return prev;
    });
  }, [handleChange]);

  return (
    <>
      <ChooseTypeOfResourceDisconnectionModalContainer />
      <CreateResourceDisconnectionContainer
        handleCreateDisconnectionState={(data) =>
          setCreateDisconnectionRequestPayload(data)
        }
      />
      <CreateResourceDisconnectionPanel
        pushStageRequest={pushStageRequest}
        openCreateDisconnectionModal={openCreateDisconnectionModal}
        createDisconnectionRequestPayload={createDisconnectionRequestPayload}
      />
    </>
  );
};
