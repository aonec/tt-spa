import React, { FC } from 'react';
import { ReassingInspectorModalContainer } from '../inspectorsDistributionService/inspectorRassignmentService';
import { SettingPage } from './view/SettingPage';
import { useUnit } from 'effector-react';
import { settingsPageService } from './settingsPageService.model';
import { temperatureGraphService } from '../temperatureGraphService';

const { inputs } = settingsPageService;

export const SettingsPageContainer: FC<{ isAdminSettings?: boolean }> = ({
  isAdminSettings = false,
}) => {
  const {
    handleEditTemperatureNormative,
    handleReassingInspector,
    setModalOpen,
  } = useUnit({
    handleEditTemperatureNormative:
      temperatureGraphService.inputs.handleEditTemperatureNormative,
    handleReassingInspector: inputs.reassingInspector,
    setModalOpen: temperatureGraphService.inputs.setUploadModalOpen,
  });

  return (
    <>
      <ReassingInspectorModalContainer />
      <SettingPage
        handleReassingInspector={() => handleReassingInspector()}
        handleEditTemperatureNormative={handleEditTemperatureNormative}
        isAdminSettings={isAdminSettings}
        setModalOpen={setModalOpen}
      />
    </>
  );
};
