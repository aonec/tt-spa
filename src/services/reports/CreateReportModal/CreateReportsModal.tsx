import React, { FC } from 'react';
import { CreateReportFormContainer } from './CreateReportForm/CreateReportFormContainer';
import { FormModal } from 'ui-kit/Modals/FormModal';

interface Props {
  isOpen: boolean;
  onHide(): void;
  onSave(): void;
  loading: boolean;
}

export const CreateReportModal: FC<Props> = ({
  isOpen,
  onHide,
  onSave,
  loading,
}) => {
  return (
    <FormModal
      formId="create-report-modal"
      title="Создание отчёта"
      visible={isOpen}
      onCancel={onHide}
      onSubmit={onSave}
      loading={loading}
      form={<CreateReportFormContainer />}
    />
  );
};
