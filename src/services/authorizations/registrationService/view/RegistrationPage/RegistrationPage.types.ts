import { ConfirmRequest } from 'api/types';

export type RegistrationPageProps = {
  isLoading: boolean;
  handleConfirmRegistration: (payload: ConfirmRequest) => void;
};
