import { Form } from 'antd';
import React, { FC } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { EditEmailModalProps } from './EditEmailModal.types';

const formId = 'edit-email-form';

export const EditEmailModal: FC<EditEmailModalProps> = ({
  setEmailIsOpen,
  email,
  submitEmail,
  setEmail,
  handleCloseSetEmailModal,
}) => {
  return (
    <FormModal
      visible={setEmailIsOpen}
      form={
        <Form id={formId} onSubmitCapture={submitEmail}>
          <FormItem label="Email">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormItem>
        </Form>
      }
      title="Новая почта для отправки отчёта"
      onCancel={() => handleCloseSetEmailModal()}
      formId={formId}
      submitBtnText="Отправить отчёт"
    />
  );
};
