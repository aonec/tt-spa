import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { stringifyUrl } from 'query-string';
import { useUnit } from 'effector-react';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';
import { isDevMode } from 'api/axios';

export function useApp() {
  const navigate = useNavigate();

  const { resetFeatureToggles } = useUnit({
    resetFeatureToggles: developmentSettingsService.inputs.resetFeatureToggles,
  });

  useEffect(() => {
    if (isDevMode) return;

    resetFeatureToggles();
  }, [resetFeatureToggles]);

  useEffect(() => {
    if (window.location.href.match(/registration/gi)) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      const redirectUrl = window.location.pathname;

      navigate(stringifyUrl({ url: '/login', query: { redirectUrl } }));
    }
  }, [navigate]);
}
