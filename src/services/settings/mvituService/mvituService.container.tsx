import { useUnit } from 'effector-react';
import { ConfigureMvituPanel } from './ConfigureMvituPanel';
import { CreateMvituIntegrationContainer } from './createMvituIntegration';
import { createMvituIntegrationService } from './createMvituIntegration/createMvituIntegrationService.models';
import { MvituIntegrationSectionContainer } from './mvituIntegrationSection';
import { AddNodeToIntegrationContainer } from './addNodeToIntegration';

export const MvituContainer = () => {
  const { connectIntegration } = useUnit({
    connectIntegration: createMvituIntegrationService.inputs.openModal,
  });

  const isMvituConnected = true;

  return (
    <>
      <AddNodeToIntegrationContainer />
      <CreateMvituIntegrationContainer />
      {isMvituConnected && <MvituIntegrationSectionContainer />}
      {!isMvituConnected && (
        <ConfigureMvituPanel handleConnect={connectIntegration} />
      )}
    </>
  );
};
