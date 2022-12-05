import React, { FC } from 'react';
import { Tabs } from 'ui-kit/Tabs';
import { Wrapper } from './AddCommonDeviceForm.styled';
import { AddCommonDeviceFormProps } from './AddCommonDeviceForm.types';
import { CommonDataStep } from './CommonDataStep';
import { DeviceStep } from './DeviceStep';
import { DocumentsStep } from './DocumentsStep';

const { TabPane } = Tabs;

export const AddCommonDeviceForm: FC<AddCommonDeviceFormProps> = ({
  currentFormStep,
  resource,
  updateRequestPayload,
  formId,
}) => {
  const componentsDictionary: { [key: number]: FC } = {
    0: () => (
      <CommonDataStep
        formId={formId}
        resource={resource}
        updateRequestPayload={updateRequestPayload}
      />
    ),
    1: () => <DeviceStep />,
    2: () => <DocumentsStep />,
  };

  const FormComponent = componentsDictionary[currentFormStep];

  return (
    <Wrapper>
      <Tabs activeKey={String(currentFormStep)}>
        <TabPane tab="Шаг 1. Общие данные" key="0" />
        <TabPane tab="Шаг 2. Прибор" key="1" />
        <TabPane tab="Шаг 3. Документы" key="2" />
      </Tabs>
      <FormComponent />
    </Wrapper>
  );
};
