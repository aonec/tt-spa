import { Footer, Header, StyledModal } from '01/shared/ui/Modal/Modal';
import { ButtonTT } from '01/tt-components';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $isCheckCreationDeviceFormDataModalOpen,
  cancelCheckingButtonClicked,
} from '../models';

export const CheckFormValuesModal = () => {
  const isOpen = useStore($isCheckCreationDeviceFormDataModalOpen);
  const onCancel = () => cancelCheckingButtonClicked();
  return (
    <StyledModal
      width={800}
      visible={isOpen}
      onCancel={onCancel}
      title={<Header>Добавление нового прибора</Header>}
      footer={
        <Footer>
          <ButtonTT color="white" key="back" onClick={onCancel}>
            Отмена
          </ButtonTT>
          <ButtonTT color="blue" key="submit">
            Создать прибор
          </ButtonTT>
        </Footer>
      }
    ></StyledModal>
  );
};
