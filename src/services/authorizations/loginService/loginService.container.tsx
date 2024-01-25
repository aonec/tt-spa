import React, { useEffect } from 'react';
import { LoginPage } from './view/LoginPage';
import { loginService } from './loginService.model';
import { useUnit } from 'effector-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { isDevMode } from 'api/axios';

const { inputs, outputs } = loginService;

export const LoginContainer = () => {
  const { handlePostLogin, isLoading, openDevSettingsModal } = useUnit({
    handlePostLogin: inputs.handlePostLogin,
    openDevSettingsModal: inputs.openDevSettingsModal,
    isLoading: outputs.$isLoading,
  });

  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(
    () =>
      inputs.successLogin.watch((successResponse) => {
        const { redirectUrl } = parse(search);
        if (redirectUrl && redirectUrl !== '/login') {
          return window.location.replace(redirectUrl as string | URL);
        }

        navigate(
          successResponse?.roles?.includes('Operator') ? '/meters' : '/tasks',
          {
            replace: true,
          },
        );
      }).unsubscribe,
    [navigate, search],
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
