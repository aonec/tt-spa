import { ModalTT } from '01/shared/ui/ModalTT';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $isPauseApartmentModalVisible,
  pauseApartmentModalCancelButtonClicked,
} from './models';

export const PauseApartmentModal = () => {
  const visible = useStore($isPauseApartmentModalVisible);

  return (
    <ModalTT
      saveBtnText="Поставить на паузу"
      visible={visible}
      title="Постановка квартиры на паузу"
      onCancel={pauseApartmentModalCancelButtonClicked}
    >
      hello
    </ModalTT>
  );
};
