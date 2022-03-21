import { Tabs } from 'antd';
import React, { FC } from 'react';
import { ModalTT } from '../../../../../../shared/ui/ModalTT';
import { CreateCalculatorModalContainer } from './CreateCalculatorModal/CreateCalculatorModalContainer';

interface Props {
  onClose(): void;
  isOpen: boolean;
}

const { TabPane } = Tabs;

export const AddNodeCalculatorConnectionModal: FC<Props> = ({
  onClose,
  isOpen,
}) => {
  return (
    <ModalTT
      visible={isOpen}
      onCancel={onClose}
      title="Подключение вычислителя"
    >
      <CreateCalculatorModalContainer />
    </ModalTT>
  );
};
