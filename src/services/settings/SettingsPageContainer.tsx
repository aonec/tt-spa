import { useEvent } from 'effector-react';
import React from 'react';
import { ReassingInspectorModalContainer } from './inspectorsDistributionService/inspectorRassignmentService';
import { settingsService } from './settingsService.models';
import { SettingsPage } from './views/SettingsPage';

 const SettingsPageContainer = () => {
  const handleReassingInspector = useEvent(
    settingsService.inputs.reassingInspector,
  );

  return (
    <>
      <ReassingInspectorModalContainer />
      <SettingsPage handleReassingInspector={() => handleReassingInspector()} />
    </>
  );
};
