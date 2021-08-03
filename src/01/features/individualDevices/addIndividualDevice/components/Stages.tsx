import { Steps } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import { $creationDeviceStage, switchStageButtonClicked } from '../models';

const { Step } = Steps;

const stepTitles = ['Общие данные о прибор', 'Документы'];

export const CreateIndividualDeviceFormStages = () => {
  const currentStageNumber = useStore($creationDeviceStage);

  return (
    <>
      <Steps direction="vertical" current={currentStageNumber}>
        {stepTitles.map((step, index) => (
          <Step
            title={step}
            onClick={() => switchStageButtonClicked(index as 0 | 1)}
          />
        ))}
      </Steps>
    </>
  );
};
