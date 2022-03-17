import React, { FC } from 'react';
import { ModalTT } from '../../../../../../shared/ui/ModalTT/';

interface Props {
  show: boolean;
  loading: boolean;
  onClose(): void;
  onRemove(): void;
}

export const RemoveConnectionConfirmModal: FC<Props> = ({
  show,
  onClose,
  loading,
  onRemove,
}) => {
  return (
    <>
      <ModalTT
        visible={show}
        title="Вы действительно хотите удалить вычислитель?"
        saveBtnText="Удалить"
        saveButtonType="red"
        onCancel={onClose}
        loading={loading}
        onSubmit={onRemove}
      >
        Вчислитель останется в системе, но будет отключен от узла. Без
        вычислителя приборы узла не будут опрашиваться в автоматическом режиме.
      </ModalTT>
    </>
  );
};
