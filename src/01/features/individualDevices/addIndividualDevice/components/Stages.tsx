import { Steps } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import { $creationDeviceStage, switchStageButtonClicked } from '../models';
import { FormHeader } from './Header';

const { Step } = Steps;

const stepTitles = ['Общие данные о приборе', 'Документы'];

export const CreateIndividualDeviceFormStages = () => {
  const currentStageNumber = useStore($creationDeviceStage);

  return (
    <div>
      <FormHeader>Этапы создания</FormHeader>
      <Steps direction="vertical" current={currentStageNumber}>
        {stepTitles.map((step, index) => (
          <Step
            title={step}
            onClick={() => switchStageButtonClicked(index as 0 | 1)}
          />
        ))}
      </Steps>
    </div>
  );
};
