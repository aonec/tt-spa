import { useEvent, useStore } from 'effector-react';
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

  const history = useNavigate();

  const pipeNode = useStore(outputs.$pipeNode);
  const isLoading = useStore(outputs.$isLoading);

  const openChangeNodeStatusModal = useEvent(inputs.openChangeNodeStatusModal);
  const openChangeNodeTypeModal = useEvent(inputs.openChangeNodeTypeModal);

  const handleChangeTab = (section: PipeNodeProfileSection) =>
    history(`/nodes/${nodeId}/${section}`, {
      replace: true,
    });

  const handleEditNode = () => history(`/nodes/${pipeNode?.id}/edit`);

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
