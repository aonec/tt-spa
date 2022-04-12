import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { deleteIndividualDeviceService } from './deleteIndividualDeviceService.models';
import { DeleteIndividualDeviceModal } from './views/DeleteIndividualDeviceModal';

export const DeleteIndividualDeviceModalContainer = () => {
  const visible = useStore(deleteIndividualDeviceService.outputs.$isModalOpen);
  const device = useStore(
    deleteIndividualDeviceService.outputs.$currentIndividualDevice
  );
  const loading = useStore(deleteIndividualDeviceService.outputs.$loading);

  const handleClose = useEvent(
    deleteIndividualDeviceService.inputs.deleteDeviceModalClosed
  );
  const handleDelete = useEvent(
    deleteIndividualDeviceService.inputs.acceptDeleteDevice
  );

  return (
    <DeleteIndividualDeviceModal
      device={device}
      visible={visible}
      loading={loading}
      handleClose={() => handleClose()}
      handleDelete={() => handleDelete()}
    />
  );
};
