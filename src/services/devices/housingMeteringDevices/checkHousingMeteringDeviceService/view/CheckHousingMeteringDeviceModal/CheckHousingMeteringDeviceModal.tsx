import React, { FC } from 'react';
import { CheckHousingMeteringDeviceModalProps } from './CheckHousingMeteringDeviceModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { CheckHousingMeteringDeviceForm } from './CheckHousingMeteringDeviceForm/CheckHousingMeteringDeviceForm';

const formId = 'check-housing-metering-device-modal';

export const CheckHousingMeteringDeviceModal: FC<
  CheckHousingMeteringDeviceModalProps
> = ({
  isModalOpen,
  handleModalClose,
  housingMeteringDevice,
  handleOnSubmit,
}) => {
  const deviceId = housingMeteringDevice?.id;

  if (!deviceId) return null;

  return (
    <FormModal
      title={`Поверка прибора ${housingMeteringDevice?.model}  (${housingMeteringDevice?.serialNumber})`}
      visible={isModalOpen}
      onCancel={handleModalClose}
      submitBtnText="Сохранить изменения"
      form={
        <CheckHousingMeteringDeviceForm
          deviceId={deviceId}
          formId={formId}
          handleOnSubmit={handleOnSubmit}
        />
      }
      formId={formId}
    />
  );
};
