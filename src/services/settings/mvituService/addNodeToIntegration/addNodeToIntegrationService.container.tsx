import { useUnit } from 'effector-react';
import { AddNodeToIntegrationModal } from './AddNodeToIntegrationModal';
import { addNodeToIntegrationService } from './addNodeToIntegrationService.models';
import { searchNodesQuery } from './addNodeToIntegrationService.api';

const { inputs, outputs } = addNodeToIntegrationService;

export const AddNodeToIntegrationContainer = () => {
  const {
    isModalOpen,
    handleCloseModal,
    handleSearchNodes,
    nodesSearchList,
    isNodesSearchLoading,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    handleCloseModal: inputs.handleCloseModal,
    handleSearchNodes: searchNodesQuery.start,
    nodesSearchList: searchNodesQuery.$data,
    isNodesSearchLoading: searchNodesQuery.$pending,
  });

  return (
    <>
      <AddNodeToIntegrationModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleSearchNodes={handleSearchNodes}
        nodesSearchList={nodesSearchList}
        isNodesSearchLoading={isNodesSearchLoading}
      />
    </>
  );
};
