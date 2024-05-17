import React from 'react';
import { connectNotificationsService } from './connectNotificationsService.models';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { useUnit } from 'effector-react';
import { Input } from 'ui-kit/Input';
import FormItem from 'antd/es/form/FormItem';
// import { Input } from 'antd';

const { inputs, outputs } = connectNotificationsService;

const FORM_ID = 'notifications-modal-form';

export const ConnectNotificationsContainer = () => {
  const { isOpen, handleClose } = useUnit({
    isOpen: outputs.$isOpen,
    handleClose: inputs.closeModal,
  });

  return (
    <FormModal
      visible={isOpen}
      title="Подключить уведомления"
      formId={FORM_ID}
      onCancel={handleClose}
      form={
        <FormItem label="Введите код">
          <Input placeholder="Введите код" style={{ width: '250px' }} />
        </FormItem>
      }
    />
  );
};
