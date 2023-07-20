import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  CreateNodeServiceZoneContainer,
  createNodeServiceZoneService,
} from 'services/nodes/createNodeServiceZoneService';
import { WithLoader } from 'ui-kit/sharedComponents/WithLoader';
import { editNodeService } from './editNodeService.model';
import { EditNodePage } from './view/EditNodePage';
import { calculatorsListService } from 'services/calculators/calculatorsListService';
import { removeNodeCalculatorConnectionService } from './view/EditNodePage/removeConnectionService';
import {
  CreateCalculatorModalContainer,
  createCalculatorModalService,
} from 'services/calculators/createCalculatorModalService';

const { gates, inputs, outputs } = editNodeService;
const { NodeIdGate, NodeResourceGate } = gates;
const { CalculatorsGate } = calculatorsListService.gates;

export const EditNodeContainer = () => {
  const { nodeId } = useParams<{ nodeId: string }>();

  const node = useStore(outputs.$node);
  const isLoading = useStore(outputs.$isLoading);
  const isUpdateLoading = useStore(outputs.$isUpdateLoading);
  const grouptype = useStore(outputs.$editNodeGrouptype);
  const nodeZones = useStore(outputs.$nodeZones);
  const calculators = useStore(calculatorsListService.outputs.$calculatorsList);

  const setGrouptype = useEvent(inputs.setEditNodeGrouptype);
  const openAddNewZonesModal = useEvent(
    createNodeServiceZoneService.inputs.openCreateNodeServiceZoneModal,
  );

  const refetchNode = useEvent(inputs.refetchNode);
  const updateNode = useEvent(inputs.updateNode);
  const openCreateCalculatorModal = useEvent(
    createCalculatorModalService.inputs.openModal,
  );
  const openRemoveConnectionModal = useEvent(
    removeNodeCalculatorConnectionService.inputs.openModal,
  );

  return (
    <>
      <NodeIdGate nodeId={nodeId} />
      {node && <CalculatorsGate buildingId={node.buildingId} />}
      <CreateNodeServiceZoneContainer />
      <CreateCalculatorModalContainer />

      <WithLoader isLoading={isLoading}>
        {node && (
          <>
            <NodeResourceGate resource={node.resource} />
            <EditNodePage
              node={node}
              grouptype={grouptype}
              setGrouptype={setGrouptype}
              openAddNewZonesModal={() => openAddNewZonesModal()}
              nodeZones={nodeZones}
              refetchNode={() => refetchNode()}
              updateNode={updateNode}
              handleOpenCreateCalculatorModal={() =>
                openCreateCalculatorModal(node.buildingId)
              }
              calculators={calculators || []}
              isUpdateLoading={isUpdateLoading}
              openRemoveConnectionModal={openRemoveConnectionModal}
            />
          </>
        )}
      </WithLoader>
    </>
  );
};
