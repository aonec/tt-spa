import React from 'react';
import { ModalTT } from '01/shared/ui/ModalTT';
import { IndividualDeviceListItemResponse } from 'myApi';

type Props = {
  visible: boolean;
  loading: boolean;
  onClose: () => void;
  onDelete: () => void;
  device?: IndividualDeviceListItemResponse | null;
};

export const DeleteIndividualDeviceModal: React.FC<Props> = ({
  visible,
  onClose,
  onDelete,
  device,
  loading,
}) => {
  return (
    <ModalTT
      title={`Вы действительно хотите удалить прибор ${device?.serialNumber} (${device?.model})?`}
      visible={visible}
      saveButtonType="red"
      saveBtnText="Удалить прибор"
      onCancel={onClose}
      onSubmit={onDelete}
      loading={loading}
    >
      Прибор будет навсегда удален из системы. Показания по прибору не будут
      приниматься.
    </ModalTT>
  );
};
