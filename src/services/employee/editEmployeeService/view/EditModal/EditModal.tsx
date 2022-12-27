import React, { FC } from 'react';
import { EditModalProps } from './EditModal.types';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { EditForm } from './EditForm';

const formId = 'edit-employee-service-modal';

export const EditModal: FC<EditModalProps> = ({}) => {
  return (
    <>
      <FormModal
        title="Выгрузка сводного отчёта"
        visible={true}
        onCancel={() => {}}
        formId={formId}
        submitBtnText="Выгрузить отчет"
        form={
          <EditForm
            formId={formId}
          />
        }
      />
    </>
  );
};
