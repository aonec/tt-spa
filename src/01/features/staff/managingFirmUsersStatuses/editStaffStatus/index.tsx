import { Footer, ModalText, StyledModal } from '01/shared/ui/Modal/Modal';
import { ButtonTT, Header } from '01/tt-components';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $isEditStaffStatusModalVisible,
  editStaffStatusCancelButtonClicked,
} from './models';

export const EditStaffStatusModal: React.FC = () => {
  const visible = useStore($isEditStaffStatusModalVisible);

  const onCancel = () => editStaffStatusCancelButtonClicked();

  return (
    <StyledModal
      width={800}
      visible={visible}
      onCancel={onCancel}
      title={<Header>Статус сотрудника</Header>}
      footer={
        <Footer>
          <ButtonTT color={'white'} key="back" onClick={onCancel}>
            Отмена
          </ButtonTT>
          <ButtonTT color="blue" key="submit">
            Изменить статус
          </ButtonTT>
        </Footer>
      }
    >
      <ModalText>Изменение статуса</ModalText>
    </StyledModal>
  );
};
