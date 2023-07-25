import { LoginRequest } from 'api/types';

export type LoginPageProps = {
  isDevMode: boolean;
  handlePostLogin: (payload: LoginRequest) => void;
  isLoading: boolean;
  openDevSettingsModal: () => void;
};
