import { FC } from 'react';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';
import { DialogDescription } from './DeleteDialog.styled';
import { Props } from './DeleteDialog.types';

export const DeleteDialog: FC<Props> = ({
  deletingServiceZone,
  deletingServiceZoneCount,
  isDeleteServiceZoneDialogOpen,
  handleSubmit,
  handleCancel,
}) => {
  return (
    <Dialog
      width={600}
      title={`Вы уверены, что хотите удалить зону “${deletingServiceZone?.name}”?`}
      description={
        <DialogDescription>
          <div>
            Эта зона используется на других узлах. При удалении зона будет
            автоматически сброшена для всех узлов.
          </div>
          <div>Количество узлов: {deletingServiceZoneCount || '-'}</div>
        </DialogDescription>
      }
      isOpen={isDeleteServiceZoneDialogOpen}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      submitText="Удалить"
      cancelText="Отмена"
      type="danger"
    />
  );
};
