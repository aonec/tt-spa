import { Footer, Header, ModalText } from '01/shared/ui/Modal/Modal';
import { StyledModal } from '01/tt-components';
import { ErrorAlert } from '01/_components/Alert';
import { useStore } from 'effector-react';
import React from 'react';
import { Button } from 'ui-kit/Button';
import {
  $isDeleteStaffModalVisible,
  $isDeletionStaffFailed,
  deleteStaffConfirmButtonClicked,
  deleteStaffFx,
  deleteStaffModalCancelButtonClicked,
} from './models';

export const DeleteStaffModal: React.FC = () => {
  const pending = useStore(deleteStaffFx.pending);
  const visible = useStore($isDeleteStaffModalVisible);
  const isFailedDeleteUser = useStore($isDeletionStaffFailed);

  const onOk = () => deleteStaffConfirmButtonClicked();
  const onCancel = () => deleteStaffModalCancelButtonClicked();

  return (
    <StyledModal
      visible={visible}
      title={<Header>Подтвердите действие</Header>}
      onOk={onOk}
      onCancel={onCancel}
      width={800}
      footer={
        <Footer>
          <Button type="ghost" key="back" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="danger" onClick={onOk} isLoading={pending}>
            Удалить
          </Button>
        </Footer>
      }
    >
      <ModalText style={{ padding: '0 24px 24px', fontSize: '18px' }}>
        <ErrorAlert
          show={isFailedDeleteUser}
          message="Не удалось удалить сотрудника"
        />
        Вы действительно хотите удалить сотрудника?
      </ModalText>
    </StyledModal>
  );
};
