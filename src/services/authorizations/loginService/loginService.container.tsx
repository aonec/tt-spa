import React, { useEffect } from 'react';
import { LoginPage } from './view/LoginPage';
import { loginService } from './loginService.model';
import { useEvent, useStore } from 'effector-react';
import { useHistory, useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { isDevMode } from '01/axios';

const { inputs, outputs } = loginService;

export const LoginContainer = () => {
  const handlePostLogin = useEvent(inputs.handlePostLogin);
  const openDevSettingsModal = useEvent(inputs.openDevSettingsModal);

  const isLoading = useStore(outputs.$isLoading);

  const { replace } = useHistory();
  const { search } = useLocation();

  useEffect(
    () =>
      inputs.successLogin.watch((successResponse) => {
        const { redirectUrl } = parse(search);
        if (redirectUrl && redirectUrl !== '/login') {
          return window.location.replace(redirectUrl as string | URL);
        }

        replace(
          successResponse?.roles?.includes('Operator') ? '/meters' : '/tasks',
        );
      }).unsubscribe,
    [replace, search],
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
