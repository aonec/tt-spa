import { RegisterNodeOnCommercialAccountingModalContainer } from '01/features/nodes/changeNodeStatusService/nodeCommercialRegistrationService';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { nodeProfileService } from './nodeProfileService.model';
import { NodeProfilePage } from './view/NodeProfilePage';
import { PipeNodeProfileSection } from './view/NodeProfilePage/NodeProfilePage.types';

const { inputs, outputs, gates } = nodeProfileService;
const { PipeNodeGate } = gates;

export const NodeProfileContainer = () => {
  const { nodeId, section } = useParams<{
    nodeId: string;
    section?: PipeNodeProfileSection;
  }>();

  const history = useHistory();

  const pipeNode = useStore(outputs.$pipeNode);
  const isLoading = useStore(outputs.$isLoading);

  const openRegisterNodeOnCommercialAccountingModal = useEvent(
    inputs.openRegisterNodeOnCommercialAccountingModal
  );

  const handleChangeTab = (section: PipeNodeProfileSection) =>
    history.push(`/nodes/${nodeId}/${section}`);

  const handleEditNode = () => history.push(`/nodes/${pipeNode?.id}/edit`);

  return (
    <>
      <PipeNodeGate pipeNodeId={Number(nodeId)} />
      {pipeNode && (
        <RegisterNodeOnCommercialAccountingModalContainer
          nodeStatus={pipeNode.nodeStatus?.value}
          resource={pipeNode.resource}
        />
      )}
      <NodeProfilePage
        isLoading={isLoading}
        pipeNode={pipeNode}
        section={section}
        handleChangeTab={handleChangeTab}
        handleEditNode={handleEditNode}
        openRegisterNodeOnCommercialAccountingModal={() =>
          openRegisterNodeOnCommercialAccountingModal()
        }
      />
    </>
  );
};
