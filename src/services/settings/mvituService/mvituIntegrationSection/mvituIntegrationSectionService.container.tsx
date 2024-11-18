import React, { useUnit } from 'effector-react';
import { MvituIntegrationSection } from './MvituIntegrationSection/MvituIntegrationSection';
import { mvituIntegrationSectionService } from './mvituIntegrationSectionService.models';
import {
  changeNodeStatusMutation,
  deleteNodeMutation,
  mvituIntegrationUpdateStatusMutation,
  mvituNodesQuery,
} from './mvituIntegrationSectionService.api';
import { mvituIntegrationQuery } from '../mvituService.api';

const {
  gates: { MvituSectionGate },
  outputs,
  inputs,
} = mvituIntegrationSectionService;

export const MvituIntegrationSectionContainer = () => {
  const {
    mvituNodesList,
    isLoading,
    integrationData,
    handleUpdateStatus,
    isUpdateStatusLoading,
    changeNodeStatus,
    deleteNode,
    nodesListRequestPayload,
    setPageNumber,
    setSearchParams,
  } = useUnit({
    mvituNodesList: mvituNodesQuery.$data,
    isLoading: mvituNodesQuery.$pending,
    integrationData: mvituIntegrationQuery.$data,
    handleUpdateStatus: mvituIntegrationUpdateStatusMutation.start,
    isUpdateStatusLoading: mvituIntegrationUpdateStatusMutation.$pending,
    changeNodeStatus: changeNodeStatusMutation.start,
    deleteNode: deleteNodeMutation.start,
    nodesListRequestPayload: outputs.$nodesListRequestPayload,
    setPageNumber: inputs.changePageNumber,
    setSearchParams: inputs.setSearchParams,
  });

  if (!integrationData) return null;
  return (
    <>
      <MvituSectionGate />
      <MvituIntegrationSection
        mvituNodesList={mvituNodesList}
        integrationData={integrationData}
        handleUpdateStatus={handleUpdateStatus}
        isUpdateStatusLoading={isUpdateStatusLoading}
        changeNodeStatus={changeNodeStatus}
        deleteNode={deleteNode}
        nodesListRequestPayload={nodesListRequestPayload}
        setPageNumber={setPageNumber}
        isLoading={isLoading}
        setSearchParams={setSearchParams}
      />
    </>
  );
};
