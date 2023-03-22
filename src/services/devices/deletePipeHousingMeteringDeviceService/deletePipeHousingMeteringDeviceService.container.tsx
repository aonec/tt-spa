import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { Dialog } from 'ui-kit/shared_components/Dialog/Dialog';
import { deletePipeHousingMeteringDeviceService } from './deletePipeHousingMeteringDeviceService.model';

const { inputs, outputs } = deletePipeHousingMeteringDeviceService;

export const DeletePipeHousingMeteringDeviceContainer = () => {
  const isOpen = useStore(outputs.$isOpen);
  const device = useStore(outputs.$pipeMeteringDevice);

  const closeModal = useEvent(inputs.closeModal);
  const handleDeleteDevice = useEvent(inputs.deleteDevice);

  return (
    <Dialog
      isOpen={isOpen}
      onCancel={closeModal}
      onSubmit={handleDeleteDevice}
      title={`Вы действительно хотите удалить прибор ${device?.serialNumber} (${device?.model})?`}
      description="Прибор будет навсегда удален из системы."
      type="danger"
      submitText="Удалить прибор"
    />
  );
};
