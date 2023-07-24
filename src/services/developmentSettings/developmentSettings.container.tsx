import { useUnit } from 'effector-react';
import React, { FC } from 'react';
import { developmentSettingsService } from './developmentSettings.models';
import { DevelopmentSettingsModal } from './view/DevelopmentSettingsModal';
import { DevelopmentSettingsContainerProps } from './developmentSettings.types';

const { inputs, outputs } = developmentSettingsService;

export const DevelopmentSettingsContainer: FC<
  DevelopmentSettingsContainerProps
> = ({ isAuth = false }) => {
  const {
    visible,
    devUrl,
    closeDevSettingsModal,
    setDevUrl,
    featureToggles,
    toggleFeature,
    resetFeatureToggles,
  } = useUnit({
    visible: outputs.$isDevSettingsModalOpen,
    devUrl: outputs.$devUrl,
    featureToggles: outputs.$featureToggles,
    closeDevSettingsModal: inputs.closeDevSettingsModal,
    setDevUrl: inputs.setDevUrl,
    toggleFeature: inputs.toggleFeature,
    resetFeatureToggles: inputs.resetFeatureToggles,
  });

  return (
    <DevelopmentSettingsModal
      visible={visible}
      closeDevSettingsModal={closeDevSettingsModal}
      devUrl={devUrl}
      setDevUrl={setDevUrl}
      featureToggles={featureToggles}
      toggleFeature={toggleFeature}
      resetFeatureToggles={resetFeatureToggles}
      isAuth={isAuth}
    />
  );
};
