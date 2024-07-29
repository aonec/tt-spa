import { useUnit } from 'effector-react';
import { ConfigureMvituPanel } from './ConfigureMvituPanel';
import { CreateMvituIntegrationContainer } from './createMvituIntegration';
import { createMvituIntegrationService } from './createMvituIntegration/createMvituIntegrationService.models';
import { MvituIntegrationSectionContainer } from './mvituIntegrationSection';
import { AddNodeToIntegrationContainer } from './addNodeToIntegration';
import { mvituService } from './mvituService.models';
import { mvituIntegrationQuery } from './mvituService.api';
import { StatusType } from 'api/mvitu.types';
import { WithLoader } from 'ui-kit/shared/WithLoader';

const {
  gates: { MvituGate },
} = mvituService;

export const MvituContainer = () => {
  const { connectIntegration, mvituIntegration, isLoadingMvituIntegration } =
    useUnit({
      connectIntegration: createMvituIntegrationService.inputs.openModal,
      mvituIntegration: mvituIntegrationQuery.$data,
      isLoadingMvituIntegration: mvituIntegrationQuery.$pending,
    });

  const isMvituConnected =
    mvituIntegration?.status &&
    mvituIntegration?.status !== StatusType.Unconfigured;

  return (
    <>
      <MvituGate />
      <AddNodeToIntegrationContainer />
      <CreateMvituIntegrationContainer />
      <WithLoader isLoading={isLoadingMvituIntegration}>
        {isMvituConnected && <MvituIntegrationSectionContainer />}
        {!isMvituConnected && (
          <ConfigureMvituPanel handleConnect={connectIntegration} />
        )}
      </WithLoader>
    </>
  );
};
