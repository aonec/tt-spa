import { useUnit } from 'effector-react';
import React, { FC } from 'react';
import { inspectorAddressesResetService } from './inspectorAddressesResetService.models';
import { InspectorAddressesResetModal } from './views/InspectorAddressesResetModal';

const { inputs, outputs } = inspectorAddressesResetService;

export const InspectorAddressesResetModalContainer: FC = () => {
  const {
    handleClose,
    handleResetAddress,
    inspectorsList,
    isOpen,
    loading,
    handleSelectInspector,
    inspectorId,
  } = useUnit({
    isOpen: outputs.$isModalOpen,
    loading: outputs.$loading,
    inspectorsList: outputs.$inspectorsList,
    handleClose: inputs.closeModal,
    handleResetAddress: inputs.resetAddresses,
    handleSelectInspector: inputs.handleSelectInspector,
    inspectorId: outputs.$inspectorId,
  });

  return (
    <InspectorAddressesResetModal
      inspectorsList={inspectorsList}
      isOpen={isOpen}
      loading={loading}
      handleResetAddress={() => handleResetAddress()}
      handleClose={() => handleClose()}
      handleSelectInspector={handleSelectInspector}
      inspectorId={inspectorId}
    />
  );
};
