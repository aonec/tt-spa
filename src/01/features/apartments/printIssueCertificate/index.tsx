import { ModalTT } from '01/shared/ui/ModalTT';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $isPrintIssueCertificateModalOpen,
  closeIssueCertificateModalButtonClicked,
} from './models';

export const GetIssueCertificateModal = () => {
  const visible = useStore($isPrintIssueCertificateModalOpen);

  return (
    <ModalTT
      onCancel={closeIssueCertificateModalButtonClicked}
      visible={visible}
      title="Выдача справки"
      saveBtnText="Печать"
    ></ModalTT>
  );
};
