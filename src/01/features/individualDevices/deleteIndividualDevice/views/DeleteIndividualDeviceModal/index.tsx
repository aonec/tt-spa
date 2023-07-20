import React from 'react';
import { IndividualDeviceListItemResponse } from 'api/myApi';
import { FormModal } from 'ui-kit/Modals/FormModal';

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
    <FormModal
      formId="delete-individual-device-modal"
      title={`Вы действительно хотите удалить прибор ${device?.serialNumber} (${device?.model})?`}
      visible={visible}
      submitButtonType="danger"
      submitBtnText="Удалить прибор"
      onCancel={handleClose}
      onSubmit={handleDelete}
      loading={loading}
      form={
        <>
          Прибор будет навсегда удален из системы. Показания по прибору не будут
          приниматься.
        </>
      }
    />
  );
};
