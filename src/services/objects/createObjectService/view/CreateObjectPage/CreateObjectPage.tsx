import { Steps } from 'antd';
import React, { FC } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { CreateObjectAdditionalInfoStage } from './CreateObjectAdditionalInfoStage';
import { CreateObjectAddressStage } from './CreateObjectAddressStage';
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
  handleAddressData,
  houseManagements,
  goBackStage,
  onPageCancel,
  createObjectData
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
              handleAddressData={handleAddressData}
              onPageCancel={onPageCancel}
              createObjectData={createObjectData}
            />
          )}

          {stageNumber === 2 && (
            <CreateObjectMainInfoStage
              houseManagements={houseManagements}
              goBackStage={goBackStage}
              onPageCancel={onPageCancel}
            />
          )}

          {stageNumber === 3 && (
            <CreateObjectAdditionalInfoStage
              goBackStage={goBackStage}
              onPageCancel={onPageCancel}
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
