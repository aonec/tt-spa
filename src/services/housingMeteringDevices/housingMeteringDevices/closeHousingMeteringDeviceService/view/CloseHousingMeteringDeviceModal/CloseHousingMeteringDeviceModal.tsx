import React, { FC } from 'react';
import { CloseHousingMeteringDeviceModalProps } from './CloseHousingMeteringDeviceModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { CloseHousingMeteringDeviceForm } from './CloseHousingMeteringDeviceForm';

const formId = 'close-housing-metering-device-modal';

export const CloseHousingMeteringDeviceModal: FC<CloseHousingMeteringDeviceModalProps> = ({
  housingMeteringDevice,
  handleModalClose,
  handleOnSubmit,
  isModalOpen,
}) => {
  const deviceId = housingMeteringDevice?.id;

  if (!deviceId) return null;

  return (
    <FormModal
      title={`Вы действительно хотите снять  ${housingMeteringDevice?.model}  (${housingMeteringDevice?.serialNumber})  с учета?`}
      visible={isModalOpen}
      onCancel={handleModalClose}
      submitBtnText="Снять прибор с учета"
      submitButtonType="danger"
      form={
        <CloseHousingMeteringDeviceForm
          deviceId={deviceId}
          handleOnSubmit={handleOnSubmit}
          formId={formId}
        />
      }
      formId={formId}
    />
  );
};
