import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { developmentSettingsService } from './developmentSettings.models';
import { DevelopmentSettingsModal } from './view/DevelopmentSettingsModal';

const { inputs, outputs } = developmentSettingsService;

export const DevSettingsModal = () => {
  const visible = useStore(outputs.$isDevSettingsModalOpen);

  const closeDevSettingsModal = useEvent(inputs.closeDevSettingsModal);

  return (
    <DevelopmentSettingsModal
      visible={visible}
      closeDevSettingsModal={closeDevSettingsModal}
    />
  );
};
