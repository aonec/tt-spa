import { useEvent } from 'effector-react';
import React from 'react';
import { createResourceDisconnectionService } from 'services/resources/createResourceDisconnectionService';
import { ReassingInspectorModalContainer } from './inspectorsDistributionService/inspectorRassignmentService';
import { settingsService } from './settingsService.models';
import { SettingsPage } from './views/SettingsPage';

export const SettingsPageContainer = () => {
  const handleReassingInspector = useEvent(
    settingsService.inputs.reassingInspector
  );
  const handleOpenCreateResourceDisconnectionModal = useEvent(
    createResourceDisconnectionService.inputs.openModal
  );

  return (
    <>
      <ReassingInspectorModalContainer />
      <SettingsPage
        handleReassingInspector={() => handleReassingInspector()}
        handleOpenCreateResourceDisconnectionModal={() =>
          handleOpenCreateResourceDisconnectionModal()
        }
      />
    </>
  );
};
