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
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';

const { Step } = Steps;

export const CreateNodePage: FC<CreateNodePageProps> = ({
  building,
  existingCities,
  isBuildingLoading,
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
  handleDeleteServiceZone,
  isDialogOpen,
}) => {
  const stepComponentDictionary: { [key: number]: ReactNode } = {
    0: (
      <MountAddress
        building={building}
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
      {building && (
        <AddressWrapper>{getBuildingAddress(building, true)}</AddressWrapper>
      )}
      <Wrapper>
        <div>
          <WithLoader isLoading={isBuildingLoading}>
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
      <Dialog
        zIndex={1100}
        width={600}
        title={`Вы уверены, что хотите удалить зону “${zoneName}”?`}
        description="Введенные данные при создании заявки не будут сохранены. Если вы хотите сохранить прогресс, вернитесь назад и завершите создание заявки."
        isOpen={isDialogOpen}
        onCancel={() => handleDeleteServiceZone(null)}
        onSubmit={() => {
          handleDialogOpen(false);
        }}
        submitText="Выйти"
        cancelText="Продолжить создание заявки"
        type="danger"
      />
    </div>
  );
};
