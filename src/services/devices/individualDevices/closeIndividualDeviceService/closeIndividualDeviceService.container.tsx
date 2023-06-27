import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { closeIndividualDeviceService } from './closeIndividualDeviceService.model';
import { useUnit } from 'effector-react';
import { CloseIndividualDeviceForm } from './view/CloseIndividualDeviceForm';

const { forms, inputs, outputs } = closeIndividualDeviceService;
const formId = 'close-individual-device-form';

export const CloseIndividualDeviceContainer = () => {
  const { device, isOpen, isLoading } = useUnit({
    device: outputs.$closingDevice,
    isOpen: outputs.$isOpen,
    isLoading: outputs.$isLoading,
  });

  const { closeModal } = useUnit({
    closeModal: inputs.closeModal,
  });

  return (
    <FormModal
      title={`Вы действительно хотите закрыть прибор ${device?.model} (${device?.serialNumber})?`}
      description="Показания по прибору будут приниматься, но они не учитываются для расчёта оплаты за потребление"
      submitBtnText="Снять прибор с учёта"
      submitButtonType="danger"
      visible={isOpen}
      formId={formId}
      onCancel={closeModal}
      loading={isLoading}
      form={
        <CloseIndividualDeviceForm
          form={forms.closeIndividualDeviceForm}
          formId={formId}
        />
      }
    />
  );
};
