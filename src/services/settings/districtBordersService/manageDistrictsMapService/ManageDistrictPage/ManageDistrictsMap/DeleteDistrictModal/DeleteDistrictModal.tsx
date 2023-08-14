import React, { FC } from 'react';
import { Props } from './DeleteDistrictModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';

export const DeleteDistrictModal: FC<Props> = ({
  closeDeleteDistrictModal,
  districtName,
  handleDeleteDistrict,
  isLoading,
}) => {
  return (
    <FormModal
      title={`Вы действительно хотите удалить ${districtName} район?`}
      visible
      loading={isLoading}
      formId="delete-district-modal"
      form={<>Район будет навсегда удален из системы.</>}
      submitButtonType="danger"
      submitBtnText="Удалить район"
      onSubmit={handleDeleteDistrict}
      onCancel={closeDeleteDistrictModal}
    />
  );
};
