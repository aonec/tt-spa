import { LoginPage } from './view/LoginPage';
import { loginService } from './loginService.model';
import { useUnit } from 'effector-react';
import { isDevMode } from 'api/axios';

const { inputs, outputs } = loginService;

export const LoginContainer = () => {
  const { handlePostLogin, isLoading, openDevSettingsModal } = useUnit({
    handlePostLogin: inputs.handlePostLogin,
    openDevSettingsModal: inputs.openDevSettingsModal,
    isLoading: outputs.$isLoading,
  });

  return (
    <LoginPage
      isDevMode={isDevMode}
      handlePostLogin={handlePostLogin}
      isLoading={isLoading}
      openDevSettingsModal={() => openDevSettingsModal()}
    />
  );
};
