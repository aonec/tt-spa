import { Footer, Header } from '01/shared/ui/Modal/Modal';
import { ButtonTT, StyledModal } from '01/tt-components';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $isDeleteContractorModalVisible,
  deleteContractorCancelButtonClicked,
  deleteContractorConfirmButtonClicked,
} from './models';

export const DeleteContractorModal = () => {
  const visible = useStore($isDeleteContractorModalVisible);

  const onCancel = () => deleteContractorCancelButtonClicked();
  const onOk = () => deleteContractorConfirmButtonClicked();

  return (
    <StyledModal
      visible={visible}
      title={<Header>Вы действительно хотите удалить контрагента?</Header>}
      onOk={onOk}
      onCancel={onCancel}
      width={800}
      footer={
        <Footer>
          <ButtonTT color={'white'} key="back" onClick={onCancel}>
            Отмена
          </ButtonTT>
          <ButtonTT color={'red'} key="submit" onClick={onOk}>
            Удалить
          </ButtonTT>
        </Footer>
      }
    />
  );
};
