import React, { FC } from 'react';
import {
  FormHeader,
  StepsWrapper,
  Wrapper,
} from './SplitPersonalNumberPage.styled';
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
  handleSubmitSwitchStage,
  handleSubmitAddNewApartmentStage,
  goBackStage,
  addNewApartmentStageData,
  switchStageData,
  transferDevicesData,
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
        saveButtonText={stageNumber === 3 ? 'Сохранить' : void 0}
        cancelButtonText={stageNumber !== 1 ? 'Назад' : void 0}
        onCancelHandler={goBackStage}
      >
        {stageNumber === 1 && (
          <SwitchStage
            homeowner={homeowner}
            formId={formId}
            handleSubmitSwitchStage={handleSubmitSwitchStage}
            switchStageData={switchStageData}
          />
        )}
        {stageNumber === 2 && (
          <AddNewApartmentStage
            formId={formId}
            apartment={apartment}
            handleSubmitAddNewApartmentStage={handleSubmitAddNewApartmentStage}
            addNewApartmentStageData={addNewApartmentStageData}
          />
        )}
        {stageNumber === 3 && <TransferDevicesStage />}
      </PersonalNumberPageContainer>

      <StepsWrapper>
        <FormHeader>Этапы разделения</FormHeader>
        <Steps direction="vertical" current={stageNumber - 1}>
          {stepTitles.map((step, key) => (
            <Step title={step} key={step} />
          ))}
        </Steps>
      </StepsWrapper>
    </Wrapper>
  );
};
