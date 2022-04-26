import { ModalTT } from '01/shared/ui/ModalTT';
import { useForm } from 'effector-forms/dist';
import React, { FC } from 'react';
import { InspectorAddressesResetModalProps } from './types';

export const InspectorAddressesResetModal: FC<InspectorAddressesResetModalProps> = ({
  isOpen,
  handleClose,
  handleResetAddress,
  form,
  loading,
}) => {
  const { fields } = useForm(form);
  return (
    <ModalTT
      title="Сбросить все адреса"
      saveBtnText="Сбросить все адреса"
      visible={isOpen}
      onCancel={handleClose}
      onSubmit={handleResetAddress}
      loading={loading}
    ></ModalTT>
  );
};
