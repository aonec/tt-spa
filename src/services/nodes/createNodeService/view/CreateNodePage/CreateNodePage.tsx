import { Steps } from 'antd';
import React, { FC, ReactNode } from 'react';
import { GoBack } from 'ui-kit/shared/GoBack';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { Title } from 'ui-kit/Title';
import { getBuildingAddress } from 'utils/getBuildingAddress';
import { CommonData } from './CommonData';
import { ConnectedDevices } from './ConnectedDevices';
import { ConnectionSettings } from './ConnectionSettings';
import { AddressWrapper, PageHeaderSC, Wrapper } from './CreateNodePage.styled';
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
  openCreateCalculatorModal,
  isDisabledAddress,
  requestPayload,
  nodeServiceZones,
  openCreateNodeServiceZoneModal,
  validateNode,
  isValidationLoading,
}) => {
  const stepComponentDictionary: { [key: number]: ReactNode } = {
    0: (
      <MountAddress
        housingStock={housingStock}
        existingCities={existingCities}
        existingStreets={existingStreets}
        updateRequestPayload={updateRequestPayload}
        isDisabledAddress={isDisabledAddress}
      />
    ),
    1: (
      <ConnectionSettings
        goPrevStep={goPrevStep}
        calculatorsList={calculatorsList}
        openCreateCalculatorModal={openCreateCalculatorModal}
        updateRequestPayload={updateRequestPayload}
        requestPayload={requestPayload}
      />
    ),
    2: (
      <CommonData
        goPrevStep={goPrevStep}
        nodeServiceZones={nodeServiceZones}
        updateRequestPayload={updateRequestPayload}
        openCreateNodeServiceZoneModal={openCreateNodeServiceZoneModal}
        requestPayload={requestPayload}
      />
    ),
    3: (
      <ConnectedDevices
        goPrevStep={goPrevStep}
        requestPayload={requestPayload}
        updateRequestPayload={updateRequestPayload}
        validateNode={validateNode}
        isValidationLoading={isValidationLoading}
      />
    ),
  };

  return (
    <div>
      <GoBack />
      <PageHeaderSC title="Добавление нового узла" isGhost />
      {housingStock && (
        <AddressWrapper>
          {getBuildingAddress(housingStock, true)}
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
