import { PageHeader } from '01/shared/ui/PageHeader';
import { Steps } from 'antd';
import React, { FC, ReactNode } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { Title } from 'ui-kit/Title';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';
import { ConnectionSettings } from './ConnectionSettings';
import { AddressWrapper, Wrapper } from './CreateNodePage.styled';
import { CreateNodePageProps } from './CreateNodePage.types';
import { MountAddress } from './MountAddress';

const { Step } = Steps;

export const CreateNodePage: FC<CreateNodePageProps> = ({
  housingStock,
  existingCities,
  isLoadingHousingStock,
  existingStreets,
  updateRequestPayload,
  goPrevStep,
  stepNumber,
  calculatorsList,
}) => {
  const stepComponentDictionary: { [key: number]: ReactNode } = {
    0: (
      <MountAddress
        housingStock={housingStock}
        existingCities={existingCities}
        existingStreets={existingStreets}
        updateRequestPayload={updateRequestPayload}
      />
    ),
    1: (
      <ConnectionSettings
        goPrevStep={goPrevStep}
        calculatorsList={calculatorsList}
      />
    ),
  };

  return (
    <div>
      <GoBack />
      <PageHeader title="Добавление нового узла" isTopMargin isGhost />
      {housingStock && (
        <AddressWrapper>
          {getHousingStockAddress(housingStock, true)}
        </AddressWrapper>
      )}
      <Wrapper>
        <div>
          <WithLoader isLoading={isLoadingHousingStock}>
            {stepComponentDictionary[stepNumber]}
          </WithLoader>
        </div>
        <div>
          <Title>Этапы создания</Title>
          <Steps direction="vertical" current={stepNumber}>
            <Step title="Адрес установки" />
            <Step title="Настройки соединения" />
            <Step title="Общие данные об узле" />
            <Step title="Подключенные приборы" />
          </Steps>
        </div>
      </Wrapper>
    </div>
  );
};
