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
import { DeleteDialog } from 'services/nodes/editNodeService/view/EditNodePage/EditNodeCommonInfo/components/DeleteDialog';

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
  deletingServiceZone,
  handleFinallyDeleteServiceZone,
  successDeleteServiceZone,
  deletingServiceZoneCount,
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
        handleDeleteServiceZone={handleDeleteServiceZone}
        successDeleteServiceZone={successDeleteServiceZone}
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

      <DeleteDialog
        deletingServiceZone={deletingServiceZone}
        deletingServiceZoneCount={deletingServiceZoneCount}
        handleCancel={() => handleDeleteServiceZone(null)}
        handleSubmit={() => {
          handleDeleteServiceZone(null);

          if (deletingServiceZone) {
            handleFinallyDeleteServiceZone(deletingServiceZone.id);
          }
        }}
        isDeleteServiceZoneDialogOpen={isDialogOpen}
      />
    </div>
  );
};
