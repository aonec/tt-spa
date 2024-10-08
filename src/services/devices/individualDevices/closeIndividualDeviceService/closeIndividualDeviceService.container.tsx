import React from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { closeIndividualDeviceService } from './closeIndividualDeviceService.model';
import { useUnit } from 'effector-react';
import { CloseIndividualDeviceForm } from './view/CloseIndividualDeviceForm';
import { apartmentIndividualDevicesMetersService } from 'services/meters/apartmentIndividualDevicesMetersService';

const { inputs, outputs } = closeIndividualDeviceService;
const formId = 'close-individual-device-form';

export const CloseIndividualDeviceContainer = () => {
  const {
    device,
    isOpen,
    isLoading,
    closeModal,
    lastReading,
    isBannerShown,
    openReadingsHistoryModal,
    handleSubmitForm,
    handleSetClosingDate,
  } = useUnit({
    device: outputs.$closingDevice,
    isOpen: outputs.$isOpen,
    isLoading: outputs.$isLoading,
    closeModal: inputs.closeModal,
    lastReading: outputs.$lastReading,
    isBannerShown: outputs.$isBannerShown,
    openReadingsHistoryModal:
      apartmentIndividualDevicesMetersService.inputs.openReadingsHistoryModal,
    handleSubmitForm: inputs.handleSubmitForm,
    handleSetClosingDate: inputs.handleSetClosingDate,
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
      disabled={isBannerShown}
      form={
        <CloseIndividualDeviceForm
          formId={formId}
          device={device}
          lastReading={lastReading}
          isBannerShown={isBannerShown}
          openReadingsHistoryModal={openReadingsHistoryModal}
          handleSubmitForm={handleSubmitForm}
          handleSetClosingDate={handleSetClosingDate}
        />
      }
    />
  );
};
