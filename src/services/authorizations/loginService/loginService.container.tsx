import React, { useEffect } from 'react';
import { LoginPage } from './view/LoginPage';
import { loginService } from './loginService.model';
import { useEvent, useStore } from 'effector-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { isDevMode } from 'api/axios';

const { inputs, outputs } = loginService;

export const LoginContainer = () => {
  const handlePostLogin = useEvent(inputs.handlePostLogin);
  const openDevSettingsModal = useEvent(inputs.openDevSettingsModal);

  const isLoading = useStore(outputs.$isLoading);

  const history = useNavigate();
  const { search } = useLocation();

  useEffect(
    () =>
      inputs.successLogin.watch((successResponse) => {
        const { redirectUrl } = parse(search);
        if (redirectUrl && redirectUrl !== '/login') {
          return window.location.replace(redirectUrl as string | URL);
        }

        history(
          successResponse?.roles?.includes('Operator') ? '/meters' : '/tasks',
          {
            replace: true,
          },
        );
      }).unsubscribe,
    [history, search],
  );

  return (
    <LoginPage
      isDevMode={isDevMode}
      handlePostLogin={handlePostLogin}
      isLoading={isLoading}
      openDevSettingsModal={() => openDevSettingsModal()}
    />
  );
};
