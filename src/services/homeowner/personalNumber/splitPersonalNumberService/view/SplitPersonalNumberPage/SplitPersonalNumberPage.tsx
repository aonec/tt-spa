import React, { FC } from 'react';
import { FormHeader, Wrapper } from './SplitPersonalNumberPage.styled';
import { SplitPersonalNumberPageProps } from './SplitPersonalNumberPage.types';
import { Steps } from 'antd';
import { SwitchStage } from './stages/SwitchStage';
import { AddNewApartmentStage } from './stages/AddNewApartmentStage';
import { TransferDevicesStage } from './stages/TransferDevicesStage';
import { PersonalNumberPageContainer } from 'services/homeowner/personalNumber/components/PersonalNumberPageContainer';
import { PersonalNumberActions } from 'services/homeowner/personalNumber/selectPersonalNumberActionService/selectPersonalNumberActionService.types';

const formId = 'split-personal-number-page';

export const SplitPersonalNumberPage: FC<SplitPersonalNumberPageProps> = ({
  stageNumber,
  apartment,
  homeowner,
}) => {
  const { Step } = Steps;
  const stepTitles = [
    'Замена лицевого счета',
    'Создание новой квартиры',
    'Перенос приборов',
  ];

  return (
    <Wrapper>
      <PersonalNumberPageContainer
        titleText="Разделение лицевого счета"
        apartment={apartment}
        type={PersonalNumberActions.Split}
        formId={formId}
      >
        {stageNumber === 1 && (
          <SwitchStage homeowner={homeowner} formId={formId} />
        )}
        {stageNumber === 2 && <AddNewApartmentStage />}
        {stageNumber === 3 && <TransferDevicesStage />}
      </PersonalNumberPageContainer>

      <div>
        <FormHeader>Этапы разделения</FormHeader>
        <Steps direction="vertical" current={stageNumber - 1}>
          {stepTitles.map((step, key) => (
            <Step title={step} key={step} />
          ))}
        </Steps>
      </div>
    </Wrapper>
  );
};
