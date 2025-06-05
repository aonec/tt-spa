import { OpenPayload, UpdateType } from '../updateHouseManagementService.types';

export type Props = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleUpdateHouseManagement: (payload: UpdateType) => void;
  initialValues: OpenPayload | null;
};
