import { useUnit } from 'effector-react';
import { openIndividualDeviceService } from './openIndividualDeviceService.models';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { reopenIndividualDeviceMutation } from './openIndividualDeviceService.api';

const { inputs, outputs } = openIndividualDeviceService;

export const OpenIndividualDeviceContainer = () => {
  const { individualDevice, handleCloseModal, handleOpenDevice, isLoading } =
    useUnit({
      individualDevice: outputs.$individualDevice,
      handleCloseModal: inputs.closeModal,
      handleOpenDevice: reopenIndividualDeviceMutation.start,
      isLoading: reopenIndividualDeviceMutation.$pending,
    });

  const isModalOpen = Boolean(individualDevice);

  const title =
    individualDevice &&
    `Вы действительно хотите открыть прибор ${individualDevice.model} (${individualDevice.serialNumber})?`;

  return (
    <FormModal
      formId="open-individual-device"
      visible={isModalOpen}
      title={title}
      form={null}
      onCancel={handleCloseModal}
      onSubmit={() => individualDevice && handleOpenDevice(individualDevice.id)}
      loading={isLoading}
    />
  );
};
