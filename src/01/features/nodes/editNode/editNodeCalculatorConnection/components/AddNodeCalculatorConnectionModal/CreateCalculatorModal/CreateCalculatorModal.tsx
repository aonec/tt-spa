import { Tabs } from 'antd';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { ModalTT } from '../../../../../../../shared/ui/ModalTT';
import { $calculatorTypesSelectItems, CalculatorInfosGate } from '../../../../../../carlculators/calculatorsInfo/models';
import { BaseInfoAddNodeCalculatorConnectionForm } from '../forms/BaseInfoAddNodeCalculatorConnectionForm';
import { ConnectionSettingsForm } from '../forms/ConnectionSettingsForm';
import { FilesUploadForm } from '../forms/FilesUploadsForm';

interface Props {
  onClose(): void;
  isOpen: boolean;
}

const { TabPane } = Tabs;

export const CreateCalculatorModal: FC<Props> = ({ onClose, isOpen }) => {
  const calculatorTypes = useStore($calculatorTypesSelectItems);

  return (
    <>
      <CalculatorInfosGate />
      <ModalTT
        visible={isOpen}
        onCancel={onClose}
        title="Добавление нового вычислителя"
        centered
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Шаг 1. Общие данные" key="1">
            <BaseInfoAddNodeCalculatorConnectionForm calculatorTypes={calculatorTypes} />
          </TabPane>
          <TabPane tab="Шаг 2. Настройка соединения" key="2">
            <ConnectionSettingsForm />
          </TabPane>
          <TabPane tab="Шаг 3. Документы" key="3">
            <FilesUploadForm />
          </TabPane>
        </Tabs>
      </ModalTT>
    </>
  );
};
