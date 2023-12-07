import { useUnit } from 'effector-react';
import React, { FC } from 'react';
import { inspectorAddressesResetService } from './inspectorAddressesResetService.models';
import { InspectorAddressesResetModal } from './views/InspectorAddressesResetModal';

export const InspectorAddressesResetModalContainer: FC = () => {
  const { handleClose, handleResetAddress, inspectorsList, isOpen, loading } =
    useUnit({
      isOpen: inspectorAddressesResetService.outputs.$isModalOpen,
      loading: inspectorAddressesResetService.outputs.$loading,
      inspectorsList: inspectorAddressesResetService.outputs.$inspectorsList,
      handleClose: inspectorAddressesResetService.inputs.closeModal,
      handleResetAddress: inspectorAddressesResetService.inputs.resetAddresses,
    });

  const form = inspectorAddressesResetService.form;

  return (
    <InspectorAddressesResetModal
      inspectorsList={inspectorsList}
      form={form}
      isOpen={isOpen}
      loading={loading}
      handleResetAddress={() => handleResetAddress()}
      handleClose={() => handleClose()}
    />
  );
};
