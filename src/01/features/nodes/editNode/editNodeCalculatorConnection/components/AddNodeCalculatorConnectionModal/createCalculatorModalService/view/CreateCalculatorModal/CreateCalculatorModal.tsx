import { useStore } from 'effector-react';
import React, { FC, ReactNode, useMemo } from 'react';
import { BaseInfoAddNodeCalculatorConnectionForm } from '../../../forms/BaseInfoAddNodeCalculatorConnectionForm';
import { ConnectionSettingsForm } from '../../../forms/ConnectionSettingsForm';
import { FilesUploadForm } from '../../../forms/FilesUploadsForm';
import { calculatorsInfoService } from 'services/calculators/calculatorsInfoService';
import { Tabs } from 'ui-kit/Tabs';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { CreateCalculatorModalProps } from './CreateCalculatorModal.types';
const { TabPane } = Tabs;

const formIds: { [key in number]: string } = {
  1: 'create-calculator-modal-base-info',
  2: 'create-calculator-modal-connection-settings',
  3: 'create-calculator-modal-files',
};

const { gates, outputs } = calculatorsInfoService;
const { CalculatorInfosGate } = gates;

export const CreateCalculatorModal: FC<CreateCalculatorModalProps> = ({
  closeModal,
  isOpen,
  stepNumber,
  updatePayload,
  goPrevStep,
  handleSubmitForm,
  isLoading,
}) => {
  const calculatorTypes = useStore(outputs.$calculatorTypesSelectItems);
  const stepComponentDictionary: { [key: number]: ReactNode } = {
    1: (
      <BaseInfoAddNodeCalculatorConnectionForm
        calculatorTypes={calculatorTypes}
        formId={formIds[1]}
      />
    ),
    2: <ConnectionSettingsForm formId={formIds[2]} />,
    3: <FilesUploadForm formId={formIds[3]} />,
  };

  const submitBtnText = useMemo(
    () => (stepNumber === 3 ? 'Сохранить' : 'Далее'),
    [stepNumber],
  );
  const cancelBtnText = useMemo(
    () => (stepNumber === 1 ? 'Отмена' : 'Назад'),
    [stepNumber],
  );

  return (
    <>
      <CalculatorInfosGate />
      <FormModal
        loading={isLoading}
        visible={isOpen}
        onCancel={stepNumber === 1 ? closeModal : goPrevStep}
        submitBtnText={submitBtnText}
        cancelBtnText={cancelBtnText}
        onSubmit={stepNumber === 3 ? handleSubmitForm : () => void null}
        title="Добавление нового вычислителя"
        form={stepComponentDictionary[stepNumber]}
        formId={formIds[stepNumber]}
      >
        <Tabs defaultActiveKey="1" activeKey={String(stepNumber)}>
          <TabPane tab="Шаг 1. Общие данные" key="1"></TabPane>
          <TabPane tab="Шаг 2. Настройка соединения" key="2"></TabPane>
          <TabPane tab="Шаг 3. Документы" key="3"></TabPane>
        </Tabs>
      </FormModal>
    </>
  );
};
