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
}) => {
  return (
    <Wrapper>
      <Tabs activeKey={currentFormStep}>
        <TabPane tab="Шаг 1. Общие данные" key="0">
          <CommonDataStep resource={resource} />
        </TabPane>
        <TabPane tab="Шаг 2. Прибор" key="1">
          <DeviceStep />
        </TabPane>
        <TabPane tab="Шаг 3. Документы" key="2">
          <DocumentsStep />
        </TabPane>
      </Tabs>
    </Wrapper>
  );
};
