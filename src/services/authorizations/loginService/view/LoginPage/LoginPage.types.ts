import { LoginRequest } from 'myApi';

export type LoginPageProps = {
  isDevMode: boolean;
  handlePostLogin: (payload: LoginRequest) => void;
  isLoading: boolean;
  openDevSettingsModal: () => void;
};
