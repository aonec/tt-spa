import { useEvent } from 'effector-react';
import React from 'react';
import { settingsService } from './settingsService.models';
import { SettingsPage } from './views/SettingsPage';

export const SettingsPageContainer = () => {
  const handleReassingInspector = useEvent(
    settingsService.inputs.reassingInspector
  );
  return (
    <SettingsPage handleReassingInspector={() => handleReassingInspector()} />
  );
};
