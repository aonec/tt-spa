import { devUrl } from '01/axios';
import React, { useEffect } from 'react';
import { LoginPage } from './view/LoginPage';
import { loginService } from './loginService.model';
import { useEvent, useStore } from 'effector-react';
import { openDevSettingsModal } from '01/features/developmentSettings/models';
import { useHistory, useLocation } from 'react-router-dom';
import { parse } from 'query-string';

const { inputs, outputs } = loginService;

const isDevMode =
  process.env.NODE_ENV === 'development' ||
  process.env.REACT_APP_API_URL === devUrl;

export const LoginContainer = () => {
  const handlePostLogin = useEvent(inputs.handlePostLogin);
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