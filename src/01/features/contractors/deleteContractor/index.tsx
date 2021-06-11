import { Footer, Header, ModalText } from '01/shared/ui/Modal/Modal';
import { ButtonTT, StyledModal } from '01/tt-components';
import { Loader } from '01/_components/Loader';
import { Alert } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $deletedСonctractorName,
  $isDeleteContractorModalVisible,
  $isDeletionContractorFailed,
  deleteContractorCancelButtonClicked,
  deleteContractorConfirmButtonClicked,
  deleteContractorFx,
} from './models';

export const DeleteContractorModal = () => {
  const visible = useStore($isDeleteContractorModalVisible);
  const pending = useStore(deleteContractorFx.pending);
  const isDeletionContractorFailed = useStore($isDeletionContractorFailed);
  const deletedContractorName = useStore($deletedСonctractorName);

  const onCancel = () => deleteContractorCancelButtonClicked();
  const onOk = () => deleteContractorConfirmButtonClicked();

  const renderDeleteContractorAlert = () =>
    isDeletionContractorFailed ? (
      <Alert
        message="Ошибка"
        description="Не удалось удалить котрагента. Пожалуйста, обновите страницу или повторите попытку позже."
        type="error"
        showIcon
        closable
        style={{ margin: '0 24px 24px' }}
      />
    ) : null;

  return (
    <StyledModal
      visible={visible}
      title={<Header>Подтвердите действие</Header>}
      onOk={onOk}
      onCancel={onCancel}
      width={800}
      footer={
        <Footer>
          <ButtonTT color={'white'} key="back" onClick={onCancel}>
            Отмена
          </ButtonTT>
          <ButtonTT
            disabled={pending}
            color={'red'}
            key="submit"
            onClick={onOk}
          >
            {pending ? <Loader show={true} /> : 'Удалить'}
          </ButtonTT>
        </Footer>
      }
    >
      {renderDeleteContractorAlert()}
      <ModalText style={{ padding: '0 24px 24px', fontSize: '18px' }}>
        Вы действительно хотите удалить контрагента {deletedContractorName}?
      </ModalText>
    </StyledModal>
  );
};
