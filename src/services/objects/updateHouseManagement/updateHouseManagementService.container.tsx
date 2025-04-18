import { useUnit } from 'effector-react';
import { UpdateHouseManagementModal } from './UpdateHouseManagementModal';
import { updateHouseManagementService } from './updateHouseManagementService.models';

const { inputs, outputs } = updateHouseManagementService;

export const UpdateHouseManagementContainer = () => {
  const {
    handleCloseModal,
    isModalOpen,
    handleUpdateHouseManagement,
    initialValues,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    handleCloseModal: inputs.handleCloseModal,
    handleUpdateHouseManagement: inputs.handleUpdateHouseManagement,
    initialValues: outputs.$initialValues,
  });

  return (
    <UpdateHouseManagementModal
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      handleUpdateHouseManagement={handleUpdateHouseManagement}
      initialValues={initialValues}
    />
  );
};
