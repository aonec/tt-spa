import React, { useEffect } from 'react';
import { LoginPage } from './view/LoginPage';
import { loginService } from './loginService.model';
import { useUnit } from 'effector-react';
import { useHistory, useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { isDevMode } from 'api/axios';

const { inputs, outputs } = loginService;

export const LoginContainer = () => {
  const { handlePostLogin, isLoading, openDevSettingsModal } = useUnit({
    handlePostLogin: inputs.handlePostLogin,
    openDevSettingsModal: inputs.openDevSettingsModal,
    isLoading: outputs.$isLoading,
  });

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
