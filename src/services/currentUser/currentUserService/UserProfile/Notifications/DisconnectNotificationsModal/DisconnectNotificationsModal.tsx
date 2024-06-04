import React, { FC } from 'react';
import { Wrapper } from './DisconnectNotificationsModal.styled';
import { Props } from './DisconnectNotificationsModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';

export const DisconnectNotificationsModal: FC<Props> = ({
  isOpen,
  handleClose,
  handleDisconnect,
  isLoading,
}) => {
  return (
    <FormModal
      formId="disconnect-notifications-modal"
      title="Отключить канал"
      visible={isOpen}
      submitButtonType="danger"
      onCancel={handleClose}
      onSubmit={handleDisconnect}
      loading={isLoading}
      form={
        <Wrapper>Вы уверены что хотите отключить канал уведомлений?</Wrapper>
      }
    />
  );
};
