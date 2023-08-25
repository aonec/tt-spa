import { ControllerCreateRequest } from 'api/types';

export type Props = {
  handleCreateIndividualSeal: (payload: ControllerCreateRequest) => void;
  isModalOpen: boolean;
  isLoading: boolean;
  closeModal: () => void;
};
