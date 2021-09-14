import { Steps } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import { $creationDeviceStage } from '../../models';
import { FormHeader } from '../Header';

const { Step } = Steps;

const stepTitles = ['Общие данные о приборе', 'Документы'];

export const CreateIndividualDeviceFormStages = () => {
  const currentStageNumber = useStore($creationDeviceStage);

  return (
    <div>
      <FormHeader>Этапы замены</FormHeader>
      <Steps direction="vertical" current={currentStageNumber}>
        {stepTitles.map((step) => (
          <Step title={step} key={step} />
        ))}
      </Steps>
    </div>
  );
};
