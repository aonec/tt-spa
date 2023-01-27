import React, { FC, ReactNode } from 'react';
import { Tabs } from 'ui-kit/Tabs';
import { Wrapper } from './AddCommonDeviceForm.styled';
import { AddCommonDeviceFormProps } from './AddCommonDeviceForm.types';
import { CommonDataStep } from './CommonDataStep';
import { DeviceStep } from './DeviceStep';
import { DocumentsStep } from './DocumentsStep';

const { TabPane } = Tabs;

export const AddCommonDeviceForm: FC<AddCommonDeviceFormProps> = ({
  currentFormStep,
  configuration,
  updateRequestPayload,
  formId,
  requestPayload,
  openAddPipeModal,
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
        openAddPipeModal={openAddPipeModal}
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

  return (
    <Wrapper>
      <Tabs activeKey={String(currentFormStep)}>
        <TabPane tab="Шаг 1. Общие данные" key="0" />
        <TabPane tab="Шаг 2. Прибор" key="1" />
        <TabPane tab="Шаг 3. Документы" key="2" />
      </Tabs>
      {formComponent}
    </Wrapper>
  );
};
