import { useEvent, useStore } from 'effector-react';
import React, { FC } from 'react';
import { inspectorAddressesResetService } from './inspectorAddressesResetService.models';
import { InspectorAddressesResetModal } from './views/InspectorAddressesResetModal';

export const InspectorAddressesResetModalContainer: FC = () => {
  const isOpen = useStore(inspectorAddressesResetService.outputs.$isModalOpen);
  const loading = useStore(inspectorAddressesResetService.outputs.$loading);
  const inspectorsList = useStore(
    inspectorAddressesResetService.outputs.$inspectorsList
  );

  const form = inspectorAddressesResetService.form;

  const handleClose = useEvent(
    inspectorAddressesResetService.inputs.closeModal
  );
  const handleResetAddress = useEvent(
    inspectorAddressesResetService.inputs.resetAddresses
  );

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
