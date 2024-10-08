import { useUnit } from 'effector-react';
import React, { useState } from 'react';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';
import { deletePipeHousingMeteringDeviceService } from './deletePipeHousingMeteringDeviceService.model';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { SerialNumberInputWrapper } from './deletePipeHousingMeteringDevice.styled';

const { inputs, outputs } = deletePipeHousingMeteringDeviceService;

export const DeletePipeHousingMeteringDeviceContainer = () => {
  const [serialNumberText, setSerialNumberText] = useState('');
  const { closeModal, device, handleDeleteDevice, isOpen } = useUnit({
    isOpen: outputs.$isOpen,
    device: outputs.$pipeMeteringDevice,
    closeModal: inputs.closeModal,
    handleDeleteDevice: inputs.deleteDevice,
  });

  return (
    <Dialog
      isOpen={isOpen}
      onCancel={closeModal}
      onSubmit={handleDeleteDevice}
      title={`Вы действительно хотите удалить прибор ${device?.serialNumber} (${device?.model})?`}
      description="Для подтверждения удаления прибора введите его серийный номер."
      type="danger"
      submitText="Удалить прибор"
      isDisabled={serialNumberText !== device?.serialNumber}
    >
      <SerialNumberInputWrapper>
        <FormItem label="Серийный номер">
          <Input
            value={serialNumberText}
            onChange={(e) => setSerialNumberText(e.target.value)}
            placeholder="Введите cерийный номер"
          />
        </FormItem>
      </SerialNumberInputWrapper>
    </Dialog>
  );
};
