import { ModalTT } from '01/shared/ui/ModalTT';
import React, { FC } from 'react';
import { ReassingInspectorModalProps } from './types';
import { ModalDescription } from './components';

export const ReassingInspectorModal: FC<ReassingInspectorModalProps> = ({
  isOpen,
  handleClose,
}) => {
  return (
    <ModalTT
      title="Переназначить сотрудника"
      visible={isOpen}
      onCancel={handleClose}
    >
      <ModalDescription>
        На все адреса такущего сотрудника будет автоматически назначен новый
        сотрудник
      </ModalDescription>
    </ModalTT>
  );
};
