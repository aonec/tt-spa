import { Tabs } from 'antd';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { ModalTT } from '../../../../../../../shared/ui/ModalTT';
import { BaseInfoAddNodeCalculatorConnectionForm } from '../forms/BaseInfoAddNodeCalculatorConnectionForm';
import { ConnectionSettingsForm } from '../forms/ConnectionSettingsForm';
import { FilesUploadForm } from '../forms/FilesUploadsForm';
import { Stage } from './types';
import { calculatorsInfoService } from 'services/calculators/calculatorsInfoService';

interface Props {
  onClose(): void;
  isOpen: boolean;
  stage: Stage;
  onNextStage(): void;
  onPreviousStage(): void;
  onSave(): void;
  loading: boolean;
}

const { TabPane } = Tabs;

export const CreateCalculatorModal: FC<Props> = ({
  onClose,
  isOpen,
  stage,
  onNextStage,
  onPreviousStage,
  onSave,
  loading,
}) => {
  const { gates, outputs } = calculatorsInfoService;
  const { CalculatorInfosGate } = gates;

  const calculatorTypes = useStore(outputs.$calculatorTypesSelectItems);

  return (
    <>
      <CalculatorInfosGate />
      <ModalTT
        loading={loading}
        visible={isOpen}
        onCancel={stage === '1' ? onClose : onPreviousStage}
        saveBtnText={stage === '3' ? 'Сохранить' : 'Далее'}
        cancelBtnText={stage === '1' ? 'Отмена' : 'Назад'}
        onSubmit={stage === '3' ? onSave : onNextStage}
        title="Добавление нового вычислителя"
        centered
      >
        <Tabs defaultActiveKey="1" activeKey={stage}>
          <TabPane tab="Шаг 1. Общие данные" key="1">
            <BaseInfoAddNodeCalculatorConnectionForm
              calculatorTypes={calculatorTypes}
            />
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
