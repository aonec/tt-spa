import React from 'react';
import { ReassingInspectorModalContainer } from '../inspectorsDistributionService/inspectorRassignmentService';
import { SettingPage } from './view/SettingPage';
import { useUnit } from 'effector-react';
import { settingsPageService } from './settingsPageService.model';
import { temperatureGraphService } from '../temperatureGraphService';

const { inputs } = settingsPageService;

export const SettingsPageContainer = () => {
  const { handleEditTemperatureNormative, handleReassingInspector } = useUnit({
    handleEditTemperatureNormative:
      temperatureGraphService.inputs.handleEditTemperatureNormative,
    handleReassingInspector: inputs.reassingInspector,
  });

  return (
    <>
      <ReassingInspectorModalContainer />
      <SettingPage
        handleReassingInspector={() => handleReassingInspector()}
        handleEditTemperatureNormative={handleEditTemperatureNormative}
      />
    </>
  );
};
