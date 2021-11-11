import { ModalTT } from '01/shared/ui/ModalTT';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $isConfirmExistingApartmentModalOpen,
  closeConfirmExistingApartmentModal,
} from '../../models';

export const ConfirmUsingExistingApartmentModal = () => {
  const show = useStore($isConfirmExistingApartmentModalOpen);

  return (
    <ModalTT
      title={'Разделение квартиры'}
      visible={show}
      onCancel={closeConfirmExistingApartmentModal}
    ></ModalTT>
  );
};
