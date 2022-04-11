import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { deleteIndividualDeviceService } from './deleteIndividualDeviceService.models';
import { DeleteIndividualDeviceModal } from './views/DeleteIndividualDeviceModal';

export const DeleteIndividualDeviceModalContainer = () => {
  const visible = useStore(deleteIndividualDeviceService.outputs.$isModalOpen);
  const device = useStore(
    deleteIndividualDeviceService.outputs.$individualDevice
  );
  const loading = useStore(deleteIndividualDeviceService.outputs.$loading);

  const onClose = useEvent(
    deleteIndividualDeviceService.inputs.closeModalButtonClicked
  );
  const onDelete = useEvent(
    deleteIndividualDeviceService.inputs.acceptDeleteDeviceButtonClicked
  );

  return (
    <DeleteIndividualDeviceModal
      device={device}
      visible={visible}
      loading={loading}
      onClose={() => onClose()}
      onDelete={() => onDelete()}
    />
  );
};
