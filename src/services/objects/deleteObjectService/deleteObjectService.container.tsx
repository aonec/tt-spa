import React from 'react';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';
import { deleteObjectService } from './deleteObjectService.model';
import { useUnit } from 'effector-react';
import { getBuildingAddress } from 'utils/getBuildingAddress';

const { inputs, outputs } = deleteObjectService;

export const DeleteObjectContainer = () => {
  const { closeModal, isOpen, building, handleDeleteBuilding, isLoading } =
    useUnit({
      isOpen: outputs.$isOpen,
      building: outputs.$building,
      isLoading: outputs.$isLoading,
      closeModal: inputs.closeModal,
      handleDeleteBuilding: inputs.deleteBuilding,
    });

  const address = getBuildingAddress(building, true) || '';

  return (
    <Dialog
      isOpen={isOpen}
      onCancel={closeModal}
      onSubmit={handleDeleteBuilding}
      isLoading={isLoading}
      title={`Вы действительно хотите удалить дом расположенный по адресу: ${address}?`}
      type="danger"
      submitText="Удалить дом"
      description="Все объекты находящиеся в этом доме будут так же удалены"
    />
  );
};
