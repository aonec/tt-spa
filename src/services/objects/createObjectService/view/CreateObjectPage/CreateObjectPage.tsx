import { Steps } from 'antd';
import React, { FC } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { CreateObjectAdditionalInfoStage } from './CreateObjectAdditionalInfoStage';
import { CreateObjectAddressStage } from './CreateObjectAddressStage';
import { CreateObjectFinalStageModal } from './CreateObjectFinalStageModal';
import { CreateObjectMainInfoStage } from './CreateObjectMainInfoStage';
import {
  GridWrapper,
  Header,
  HeaderTitle,
  Wrapper,
} from './CreateObjectPage.styled';
import { CreateObjectPageProps } from './CreateObjectPage.types';

export const CreateObjectPage: FC<CreateObjectPageProps> = ({
  existingStreets,
  existingCities,
  stageNumber,
  houseManagements,
  goBackStage,
  onPageCancel,
  createObjectData,
  handleSubmitCreateObject,
}) => {
  const { Step } = Steps;
  const stepTitles = [
    'Адрес объекта',
    'Основная информация',
    'Дополнительная информация',
  ];

  return (
    <Wrapper>
      <Header>
        <GoBack />
        <HeaderTitle>Добавление нового объекта</HeaderTitle>
      </Header>

      <GridWrapper>
        <div>
          {stageNumber === 1 && (
            <CreateObjectAddressStage
              existingStreets={existingStreets}
              existingCities={existingCities}
              onPageCancel={onPageCancel}
              createObjectData={createObjectData}
              handleSubmitCreateObject={handleSubmitCreateObject}
            />
          )}

          {stageNumber === 2 && (
            <CreateObjectMainInfoStage
              houseManagements={houseManagements}
              goBackStage={goBackStage}
              onPageCancel={onPageCancel}
              createObjectData={createObjectData}
              handleSubmitCreateObject={handleSubmitCreateObject}
            />
          )}

          {stageNumber === 3 && (
            <CreateObjectAdditionalInfoStage
              goBackStage={goBackStage}
              onPageCancel={onPageCancel}
              createObjectData={createObjectData}
              handleSubmitCreateObject={handleSubmitCreateObject}
            />
          )}
          {stageNumber === 4 && (
            <CreateObjectFinalStageModal
              onPageCancel={onPageCancel}
              goBackStage={goBackStage}
              createObjectData={createObjectData}
            />
          )}
        </div>
        <div>
          <Steps direction="vertical" current={stageNumber - 1}>
            {stepTitles.map((step) => (
              <Step title={step} key={step} />
            ))}
          </Steps>
        </div>
      </GridWrapper>
    </Wrapper>
  );
};
