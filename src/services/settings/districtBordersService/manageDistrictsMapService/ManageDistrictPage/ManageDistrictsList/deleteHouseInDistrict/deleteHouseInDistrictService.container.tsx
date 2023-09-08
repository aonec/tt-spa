import React, { FC } from 'react';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';
import { deleteHouseInDistrictService } from './deleteHouseInDistrictService.models';
import { useUnit } from 'effector-react';
import { deleteHouseInDistrictMutation } from './deleteHouseInDistrictService.api';
import { DeleteHouseInDistrictContainerProps } from './deleteHouseInDistrictService.types';

const { inputs, outputs } = deleteHouseInDistrictService;

export const DeleteHouseInDistrictContainer: FC<
  DeleteHouseInDistrictContainerProps
> = ({ buildingId, districtId }) => {
  const { handleDialogShow, isDialogOpen } = useUnit({
    handleDialogShow: inputs.handleDialogShow,
    isDialogOpen: outputs.$isDialogOpen,
  });

  const { start: deleteHouse, pending: isLoading } = useUnit(
    deleteHouseInDistrictMutation,
  );

  return (
    <Dialog
      title="Вы действительно хотите удалить дом?"
      isOpen={isDialogOpen}
      isLoading={isLoading}
      onCancel={() => handleDialogShow(false)}
      onSubmit={() => deleteHouse({ districtId, data: buildingId })}
      submitText="Удалить дом"
      type="danger"
    />
  );
};
