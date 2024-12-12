import { useUnit } from 'effector-react';
import React, { FC, ReactNode, useMemo } from 'react';
import { BaseInfoForm } from './BaseInfoForm';
import { ConnectionSettingsForm } from './ConnectionSettingsForm';
import { calculatorsInfoService } from 'services/calculators/calculatorsInfoService';
import { Tabs } from 'ui-kit/Tabs';
import { FormModal } from 'ui-kit/Modals/FormModal';
import { CreateCalculatorModalProps } from './CreateCalculatorModal.types';
import { CreateCalculatorModalFilesUploadForm } from './CreateCalculatorModalFilesUploadForm/CreateCalculatorModalFilesUploadForm';

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
  isLoading,
  payload,
}) => {
  const { calculatorTypes } = useUnit({
    calculatorTypes: outputs.$calculatorTypesSelectItems,
  });
  const stepComponentDictionary: { [key: number]: ReactNode } = useMemo(
    () => ({
      1: (
        <BaseInfoForm
          calculatorTypes={calculatorTypes}
          formId={formIds[1]}
          updatePayload={updatePayload}
          initialValues={payload}
        />
      ),
      2: (
        <ConnectionSettingsForm
          formId={formIds[2]}
          updatePayload={updatePayload}
          initialValues={payload}
        />
      ),
      3: (
        <CreateCalculatorModalFilesUploadForm
          formId={formIds[3]}
          updatePayload={updatePayload}
          initialValues={payload}
        />
      ),
    }),
    [calculatorTypes, updatePayload, payload],
  );

  const tabItems = useMemo(
    () => [
      { label: 'Шаг 1. Общие данные', key: '1' },
      { label: 'Шаг 2. Настройка соединения', key: '2' },
      { label: 'Шаг 3. Документы', key: '3' },
    ],
    [],
  );

  const form = useMemo(() => {
    return (
      <>
        <Tabs
          defaultActiveKey="1"
          activeKey={String(stepNumber)}
          items={tabItems}
        />

        {stepComponentDictionary[stepNumber]}
      </>
    );
  }, [stepNumber, stepComponentDictionary, tabItems]);

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
        title="Добавление нового вычислителя"
        form={form}
        formId={formIds[stepNumber]}
      ></FormModal>
    </>
  );
};
