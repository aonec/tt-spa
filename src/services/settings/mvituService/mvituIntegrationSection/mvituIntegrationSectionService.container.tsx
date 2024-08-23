import { useUnit } from 'effector-react';
import { MvituIntegrationSection } from './MvituIntegrationSection/MvituIntegrationSection';
import { mvituIntegrationSectionService } from './mvituIntegrationSectionService.models';
import {
  changeNodeStatusMutation,
  mvituIntegrationUpdateStatusMutation,
  mvituNodesQuery,
} from './mvituIntegrationSectionService.api';
import { mvituIntegrationQuery } from '../mvituService.api';

const {
  gates: { MvituSectionGate },
} = mvituIntegrationSectionService;

export const MvituIntegrationSectionContainer = () => {
  const {
    mvituNodesList,
    integrationData,
    handleUpdateStatus,
    isUpdateStatusLoading,
    changeNodeStatus,
  } = useUnit({
    mvituNodesList: mvituNodesQuery.$data,
    integrationData: mvituIntegrationQuery.$data,
    handleUpdateStatus: mvituIntegrationUpdateStatusMutation.start,
    isUpdateStatusLoading: mvituIntegrationUpdateStatusMutation.$pending,
    changeNodeStatus: changeNodeStatusMutation.start,
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
      />
    </>
  );
};
