import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { Dialog } from 'ui-kit/shared_components/Dialog/Dialog';
import { deleteHousingMeteringDeviceService } from './deleteHousingMeteringDeviceService.model';

const { inputs, outputs } = deleteHousingMeteringDeviceService;

export const DeleteHousingMeteringDeviceContainer = () => {
  const device = useStore(outputs.$housingMeteringDevice);
  const isOpen = useStore(outputs.$isOpen);

  const closeModal = useEvent(inputs.closeModal);

  return (
    <Dialog
      onCancel={closeModal}
      isOpen={isOpen}
      title={`Вы действительно хотите удалить прибор ${
        device?.serialNumber || ''
      } (${device?.model || ''})?`}
      type={'danger'}
      description={'Прибор будет навсегда удален из системы.'}
    />
  );
};
