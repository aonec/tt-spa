import React, { FC } from 'react';
import { Props } from './DeleteDistrictModal.types';
import { Dialog } from 'ui-kit/shared_components/Dialog/Dialog';

export const DeleteDistrictModal: FC<Props> = ({
  isDeleteDistrictModalOpen,
  handleCloseDeleteDistrictModal,
  handleDeleteDistrict,
  isDeletingDistrictLoading,
}) => {
  return (
    <Dialog
      title="Вы действительно хотите удалить район?"
      isOpen={isDeleteDistrictModalOpen}
      onCancel={handleCloseDeleteDistrictModal}
      submitText="Удалить"
      type="danger"
      onSubmit={handleDeleteDistrict}
      isLoading={isDeletingDistrictLoading}
    />
  );
};
