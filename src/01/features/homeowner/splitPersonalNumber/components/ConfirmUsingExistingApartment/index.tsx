import { ModalTT } from '01/shared/ui/ModalTT';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $checkedExistingApartmentId,
  $isConfirmExistingApartmentModalOpen,
  closeConfirmExistingApartmentModal,
} from '../../models';

export const ConfirmUsingExistingApartmentModal = () => {
  const show = useStore($isConfirmExistingApartmentModalOpen);

  const id = useStore($checkedExistingApartmentId);

  return (
    <ModalTT
      title={'Разделение квартиры'}
      visible={show}
      onCancel={closeConfirmExistingApartmentModal}
    ></ModalTT>
  );
};
