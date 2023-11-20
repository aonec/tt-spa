import React, { FC, ReactNode, useMemo } from 'react';
import { Tabs } from 'ui-kit/Tabs';
import { Wrapper } from './AddCommonDeviceForm.styled';
import { AddCommonDeviceFormProps } from './AddCommonDeviceForm.types';
import { CommonDataStep } from './CommonDataStep';
import { DeviceStep } from './DeviceStep';
import { DocumentsStep } from './DocumentsStep';

export const AddCommonDeviceForm: FC<AddCommonDeviceFormProps> = ({
  currentFormStep,
  configuration,
  updateRequestPayload,
  formId,
  requestPayload,
  communicationPipes,
  handleFormComplete,
}) => {
  const componentsDictionary: { [key: number]: ReactNode } = {
    0: (
      <CommonDataStep
        formId={formId}
        configuration={configuration}
        updateRequestPayload={updateRequestPayload}
        requestPayload={requestPayload}
      />
    ),
    1: (
      <DeviceStep
        formId={formId}
        communicationPipes={communicationPipes}
        updateRequestPayload={updateRequestPayload}
        requestPayload={requestPayload}
      />
    ),
    2: (
      <DocumentsStep
        formId={formId}
        updateRequestPayload={updateRequestPayload}
        handleFormComplete={handleFormComplete}
      />
    ),
  };

  const formComponent = componentsDictionary[currentFormStep];

  const tabItems = useMemo(
    () => [
      { label: 'Шаг 1. Общие данные', key: '0' },
      { label: 'Шаг 2. Прибор', key: '1' },
      { label: 'Шаг 3. Документы', key: '2' },
    ],
    [],
  );

  return (
    <Wrapper>
      <Tabs activeKey={String(currentFormStep)} items={tabItems} />

      {formComponent}
    </Wrapper>
  );
};
