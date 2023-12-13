import { useUnit } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  CreateNodeServiceZoneContainer,
  createNodeServiceZoneService,
} from 'services/nodes/createNodeServiceZoneService';
import { WithLoader } from 'ui-kit/shared/WithLoader';
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

  const {
    calculators,
    grouptype,
    isLoading,
    isUpdateLoading,
    node,
    nodeZones,
    openAddNewZonesModal,
    openCreateCalculatorModal,
    openRemoveConnectionModal,
    refetchNode,
    setGrouptype,
    updateNode,
  } = useUnit({
    node: outputs.$node,
    isLoading: outputs.$isLoading,
    isUpdateLoading: outputs.$isUpdateLoading,
    grouptype: outputs.$editNodeGrouptype,
    nodeZones: outputs.$nodeZones,
    calculators: calculatorsListService.outputs.$calculatorsList,
    setGrouptype: inputs.setEditNodeGrouptype,
    openAddNewZonesModal:
      createNodeServiceZoneService.inputs.openCreateNodeServiceZoneModal,
    refetchNode: inputs.refetchNode,
    updateNode: inputs.updateNode,
    openCreateCalculatorModal: createCalculatorModalService.inputs.openModal,
    openRemoveConnectionModal:
      removeNodeCalculatorConnectionService.inputs.openModal,
  });

  if (!nodeId) return null;

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
