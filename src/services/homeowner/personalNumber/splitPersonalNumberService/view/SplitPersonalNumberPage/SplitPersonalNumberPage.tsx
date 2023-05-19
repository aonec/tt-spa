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
  individualDevices,
  handleSubmitTransferDevicesStage,
  handleCheckApartmentExist,
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
        formId={formId}
        onCancelHandler={goBackStage}
        isFirstStage={stageNumber === 1}
        isLastStage={stageNumber === 3}
        handleCheckApartmentExist={handleCheckApartmentExist}
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
        {stageNumber === 3 && (
          <TransferDevicesStage
            formId={formId}
            individualDevices={individualDevices}
            transferDevicesData={transferDevicesData}
            handleSubmitTransferDevicesStage={handleSubmitTransferDevicesStage}
          />
        )}
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
