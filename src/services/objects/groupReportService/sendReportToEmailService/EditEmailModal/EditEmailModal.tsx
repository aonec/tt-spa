import React, { FC } from 'react';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { Wrapper } from './EditEmailModal.styled';
import { EditEmailModalProps } from './EditEmailModal.types';

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
        <FormItem label="Email">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormItem>
      }
      title="Новая почта для отправки отчёта"
      onCancel={() => handleCloseSetEmailModal()}
      onSubmit={() => submitEmail()}
      submitBtnText="Отправить отчёт"
    />
  );
};
