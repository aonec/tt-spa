import { ConfirmRequest } from 'api/myApi';

export type RegistrationPageProps = {
  isLoading: boolean;
  handleConfirmRegistration: (payload: ConfirmRequest) => void;
};
