import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { developmentSettingsService } from './developmentSettings.models';
import { DevelopmentSettingsModal } from './view/DevelopmentSettingsModal';

const { inputs, outputs } = developmentSettingsService;

export const DevSettingsModal = () => {
  const visible = useStore(outputs.$isDevSettingsModalOpen);
  const devUrl = useStore(outputs.$devUrl);

  const closeDevSettingsModal = useEvent(inputs.closeDevSettingsModal);
  const setDevUrl = useEvent(inputs.setDevUrl);

  return (
    <DevelopmentSettingsModal
      visible={visible}
      closeDevSettingsModal={closeDevSettingsModal}
      devUrl={devUrl}
      setDevUrl={setDevUrl}
    />
  );
};
