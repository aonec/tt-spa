import React, { FC } from 'react';
import { addResourceDisconnectionService } from './addResourceDisconnectionService.models';
import { ActionComponentProps } from '../TaskActionsPanel.types';
import { CreateResourceDisconnectionPanel } from './view/CreateResourceDisconnectionPanel';
import { CreateResourceDisconnectionContainer } from 'services/resources/createResourceDisconnectionService';
import { useUnit } from 'effector-react';
import { ChooseTypeOfResourceDisconnectionModalContainer } from 'services/resources/chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.container';

const { inputs } = addResourceDisconnectionService;

export const AddResourceDisconnectionContainer: FC<ActionComponentProps> = ({
  handleChange,
  pushStageRequestPayload,
  task,
}) => {
  const { openCreateDisconnectionModal } = useUnit({
    openCreateDisconnectionModal: inputs.openCreateDisconnectionModal,
  });

  return (
    <>
      <ChooseTypeOfResourceDisconnectionModalContainer />
      <CreateResourceDisconnectionContainer
        handleCreateDisconnectionState={(data) =>
          handleChange({
            resourceDisconnecting: {
              ...data,
              housingStockIds: data.housingStockIds.filter(Boolean),
            },
          })
        }
        dateFrom={task.creationTime}
        preselectedBuilding={task.buildingId}
        defaultResource={task.device?.resource || task.pipeNode?.resource}
      />
      <CreateResourceDisconnectionPanel
        pushStageRequest={pushStageRequestPayload}
        openCreateDisconnectionModal={openCreateDisconnectionModal}
        handleRemove={() => handleChange({ resourceDisconnecting: null })}
      />
    </>
  );
};
