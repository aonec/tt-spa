import React from 'react';
import { useUnit } from 'effector-react';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';
import { deleteHouseInDistrictService } from './deleteHouseInDistrictService.models';
import { deleteHouseInDistrictMutation } from './deleteHouseInDistrictService.api';

const { inputs, outputs } = deleteHouseInDistrictService;

export const DeleteHouseInDistrictContainer = () => {
  const { handleCloseDialog, isDialogOpen, handleDelete, isDeleteLoading } =
    useUnit({
      handleCloseDialog: inputs.handleCloseDialog,
      handleDelete: inputs.handleDelete,
      isDialogOpen: outputs.$isDialogOpen,
      isDeleteLoading: deleteHouseInDistrictMutation.$pending,
    });

  return (
    <Dialog
      title="Вы действительно хотите удалить дом?"
      isOpen={isDialogOpen}
      isLoading={isDeleteLoading}
      onCancel={() => handleCloseDialog()}
      onSubmit={() => handleDelete()}
      submitText="Удалить дом"
      type="danger"
    />
  );
};
