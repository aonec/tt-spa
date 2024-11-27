import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';
import { isDevMode } from 'api/axios';

export function useApp() {
  const { resetFeatureToggles } = useUnit({
    resetFeatureToggles: developmentSettingsService.inputs.resetFeatureToggles,
  });

  useEffect(() => {
    if (isDevMode) return;

    resetFeatureToggles();
  }, [resetFeatureToggles]);
}
