import React, { FC } from 'react';
import { Props } from './DistributeAppointmentsModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';

export const DistributeAppointmentsModal: FC<Props> = ({
  isModalOpen,
  handleCloseModal,
}) => {
  return (
    <FormModal
      title="Распределение записей опломбировки"
      visible={isModalOpen}
      formId="distribute-appointmets-form"
      onCancel={handleCloseModal}
      form={<></>}
    />
  );
};
