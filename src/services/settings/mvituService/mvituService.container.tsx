import { useUnit } from 'effector-react';
import { ConfigureMvituPanel } from './ConfigureMvituPanel';
import { CreateMvituIntegrationContainer } from './createMvituIntegration';
import { createMvituIntegrationService } from './createMvituIntegration/createMvituIntegrationService.models';

export const MvituContainer = () => {
  const { connectIntegration } = useUnit({
    connectIntegration: createMvituIntegrationService.inputs.openModal,
  });

  return (
    <>
      <CreateMvituIntegrationContainer />
      <ConfigureMvituPanel handleConnect={connectIntegration} />
    </>
  );
};
