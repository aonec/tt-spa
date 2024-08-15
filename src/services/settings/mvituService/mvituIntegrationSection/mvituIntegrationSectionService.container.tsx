import { useUnit } from 'effector-react';
import { MvituIntegrationSection } from './MvituIntegrationSection/MvituIntegrationSection';
import { mvituIntegrationSectionService } from './mvituIntegrationSectionService.models';
import { mvituNodesQuery } from './mvituIntegrationSectionService.api';

const {
  gates: { MvituSectionGate },
} = mvituIntegrationSectionService;

export const MvituIntegrationSectionContainer = () => {
  const { mvituNodesList } = useUnit({ mvituNodesList: mvituNodesQuery.$data });

  return (
    <>
      <MvituSectionGate />
      <MvituIntegrationSection mvituNodesList={mvituNodesList} />
    </>
  );
};
