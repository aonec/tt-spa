import { ControllerCreateRequest } from 'api/myApi';

export type Props = {
  handleCreateIndividualSeal: (payload: ControllerCreateRequest) => void;
  isModalOpen: boolean;
  isLoading: boolean;
  closeModal: () => void;
};
