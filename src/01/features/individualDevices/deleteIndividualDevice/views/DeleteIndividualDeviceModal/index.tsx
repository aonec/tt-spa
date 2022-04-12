import React from 'react';
import { ModalTT } from '01/shared/ui/ModalTT';
import { IndividualDeviceListItemResponse } from 'myApi';

type Props = {
  visible: boolean;
  loading: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  device?: IndividualDeviceListItemResponse | null;
};

export const DeleteIndividualDeviceModal: React.FC<Props> = ({
  visible,
  handleClose,
  handleDelete,
  device,
  loading,
}) => {
  return (
    <ModalTT
      title={`Вы действительно хотите удалить прибор ${device?.serialNumber} (${device?.model})?`}
      visible={visible}
      saveButtonType="red"
      saveBtnText="Удалить прибор"
      onCancel={handleClose}
      onSubmit={handleDelete}
      loading={loading}
    >
      Прибор будет навсегда удален из системы. Показания по прибору не будут
      приниматься.
    </ModalTT>
  );
};
