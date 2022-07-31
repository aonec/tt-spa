import { Steps } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import { FormHeader } from '../../../../individualDevices/switchIndividualDevice/components/Header';
import {
  $splitPersonalNumberStageNumber,
  setSplitPersonalNumberStage,
} from '../../models';

const { Step } = Steps;

const stepTitles = [
  'Замена лицевого счета',
  'Создание новой квартиры',
  'Перенос приборов',
];

export const Stages = () => {
  const stage = useStore($splitPersonalNumberStageNumber);

  return (
    <div>
      <FormHeader>Этапы разделения</FormHeader>
      <Steps
        direction="vertical"
        current={stage - 1}
        onChange={(value) => setSplitPersonalNumberStage(value + 1)}
      >
        {stepTitles.map((step, key) => (
          <Step title={step} key={step} />
        ))}
      </Steps>
    </div>
  );
};
