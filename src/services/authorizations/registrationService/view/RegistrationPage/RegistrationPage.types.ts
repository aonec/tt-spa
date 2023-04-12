import { ConfirmRequest } from 'myApi';

export type RegistrationPageProps = {
  isLoading: boolean;
  handleConfirmRegistration: (payload: ConfirmRequest) => void;
};
