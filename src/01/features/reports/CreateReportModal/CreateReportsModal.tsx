import { ModalTT } from '01/shared/ui/ModalTT';
import React, { FC } from 'react';
import { CreateReportFormContainer } from './CreateReportForm/CreateReportFormContainer';

interface Props {
  isOpen: boolean;
}

export const CreateReportModal: FC<Props> = ({ isOpen }) => {
  return (
    <ModalTT title="Создать отчет" visible={isOpen}>
      <CreateReportFormContainer />
    </ModalTT>
  );
};
