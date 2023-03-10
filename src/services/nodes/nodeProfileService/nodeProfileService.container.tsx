import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ChangeNodeStatusContainer } from '../changeNodeStatusService';
import { ChangeNodeTypeContainer } from '../changeNodeTypeService';
import { nodeProfileService } from './nodeProfileService.model';
import { NodeProfilePage } from './view/NodeProfilePage';
import { PipeNodeProfileSection } from './view/NodeProfilePage/NodeProfilePage.types';
import { currentUserService } from 'services/currentUserService';
import _ from 'lodash';
import { ESecuredIdentityRoleName } from 'myApi';

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

  const openChangeNodeStatusModal = useEvent(inputs.openChangeNodeStatusModal);
  const openChangeNodeTypeModal = useEvent(inputs.openChangeNodeTypeModal);

  const handleChangeTab = (section: PipeNodeProfileSection) =>
    history.push(`/nodes/${nodeId}/${section}`);

  const handleEditNode = () => history.push(`/nodes/${pipeNode?.id}/edit`);

  const userRoles = useStore(currentUserService.outputs.$currentUserRoles);
  const userRolesKeys = userRoles.map((e) => e.key);

  const isPermitionToEditsNode = Boolean(
    _.intersection(userRolesKeys, [
      ESecuredIdentityRoleName.Administrator,
      ESecuredIdentityRoleName.ManagingFirmExecutor,
    ]).length,
  );

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
