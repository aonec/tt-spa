import { useUnit } from 'effector-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeNodeStatusContainer } from '../changeNodeStatusService';
import { ChangeNodeTypeContainer } from '../changeNodeTypeService';
import { nodeProfileService } from './nodeProfileService.model';
import { NodeProfilePage } from './view/NodeProfilePage';
import { PipeNodeProfileSection } from './view/NodeProfilePage/NodeProfilePage.types';
import { ESecuredIdentityRoleName } from 'api/types';
import { usePermission } from 'hooks/usePermission';

const { inputs, outputs, gates } = nodeProfileService;
const { PipeNodeGate } = gates;

export const NodeProfileContainer = () => {
  const { nodeId, section } = useParams<{
    nodeId: string;
    section?: PipeNodeProfileSection;
  }>();

  const navigate = useNavigate();

  const {
    isLoading,
    pipeNode,
    openChangeNodeStatusModal,
    openChangeNodeTypeModal,
  } = useUnit({
    pipeNode: outputs.$pipeNode,
    isLoading: outputs.$isLoading,
    openChangeNodeStatusModal: inputs.openChangeNodeStatusModal,
    openChangeNodeTypeModal: inputs.openChangeNodeTypeModal,
  });

  const handleChangeTab = (section: PipeNodeProfileSection) =>
    navigate(`/nodes/${nodeId}/${section}`, {
      replace: true,
    });

  const handleEditNode = () => navigate(`/nodes/${pipeNode?.id}/edit`);

  const isPermitionToEditsNode = usePermission([
    ESecuredIdentityRoleName.Administrator,
    ESecuredIdentityRoleName.ManagingFirmExecutor,
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  ]);

  return (
    <>
      <PipeNodeGate pipeNodeId={Number(nodeId)} />
      <ChangeNodeStatusContainer />
      <ChangeNodeTypeContainer />
      <NodeProfilePage
        isLoading={isLoading}
        pipeNode={pipeNode}
        section={section}
        handleChangeTab={handleChangeTab}
        handleEditNode={handleEditNode}
        openChangeNodeStatusModal={openChangeNodeStatusModal}
        openChangeNodeTypeModal={openChangeNodeTypeModal}
        isPermitionToEditsNode={isPermitionToEditsNode}
      />
    </>
  );
};
