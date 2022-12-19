import { useStore } from 'effector-react';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { nodeProfileService } from './nodeProfileService.model';
import { NodeProfilePage } from './view/NodeProfilePage';
import { PipeNodeProfileSection } from './view/NodeProfilePage/NodeProfilePage.types';

const { outputs, gates } = nodeProfileService;
const { PipeNodeGate } = gates;

export const NodeProfileContainer = () => {
  const { nodeId, section } = useParams<{
    nodeId: string;
    section?: PipeNodeProfileSection;
  }>();

  const history = useHistory();

  const pipeNode = useStore(outputs.$pipeNode);
  const isLoading = useStore(outputs.$isLoading);

  const handleChangeTab = (section: PipeNodeProfileSection) =>
    history.push(`/nodes/${nodeId}/${section}`);

  return (
    <>
      <PipeNodeGate pipeNodeId={Number(nodeId)} />
      <NodeProfilePage
        isLoading={isLoading}
        pipeNode={pipeNode}
        section={section}
        handleChangeTab={handleChangeTab}
      />
    </>
  );
};
