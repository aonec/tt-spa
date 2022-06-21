import { ModalTT } from '01/shared/ui/ModalTT';
import React, { FC } from 'react';
import { CreateReportFormContainer } from './CreateReportForm/CreateReportFormContainer';

interface Props {
  isOpen: boolean;
  onHide(): void;
  onSave(): void;
  loading: boolean
}

export const CreateReportModal: FC<Props> = ({ isOpen, onHide, onSave, loading }) => {
  return (
    <ModalTT
      title="Создать отчет"
      visible={isOpen}
      onCancel={onHide}
      onSubmit={onSave}
      loading={loading}
    >
      <CreateReportFormContainer />
    </ModalTT>
  );
};
