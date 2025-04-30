import { CreateHouseManagementRequest } from 'api/types';

export type Props = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleCreateHouseManagement: (payload: CreateHouseManagementRequest) => void;
};
