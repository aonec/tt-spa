import { ModalTT } from '01/shared/ui/ModalTT';
import React, { FC } from 'react';
import { CreateReportFormContainer } from './CreateReportForm/CreateReportFormContainer';

interface Props {
  isOpen: boolean;
  onHide(): void;
}

export const CreateReportModal: FC<Props> = ({ isOpen, onHide }) => {
  return (
    <ModalTT title="Создать отчет" visible={isOpen} onCancel={onHide}>
      <CreateReportFormContainer />
    </ModalTT>
  );
};
