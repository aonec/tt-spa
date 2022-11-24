import React, { FC } from 'react';
import { FormModal } from 'ui-kit/Modals/FormModal/FormModal';
import { EditHomeownerForm } from '../../../EditHomeownerForm';
import { CreateHomeownerModalProps } from './CreateHomeownerModal.types';

const formId = 'create-homeowner-form';

export const CreateHomeownerModal: FC<CreateHomeownerModalProps> = ({}) => {
  return (
    <FormModal
      visible={false}
      title="Добавление собственника"
      formId={formId}
      form={<EditHomeownerForm formId={formId} />}
    />
  );
};
