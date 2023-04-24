import React from 'react';
import { ReassingInspectorModalContainer } from '../inspectorsDistributionService/inspectorRassignmentService';
import { SettingPage } from './view/SettingPage';
import { useEvent } from 'effector-react';
import { settingsPageService } from './settingsPageService.model';

const { inputs } = settingsPageService;

export const SettingsPageContainer = () => {
  const handleReassingInspector = useEvent(inputs.reassingInspector);

  return (
    <>
      <ReassingInspectorModalContainer />
      <SettingPage handleReassingInspector={() => handleReassingInspector()} />
    </>
  );
};
