import { Steps } from 'antd';
import React, { FC } from 'react';
import { GoBack } from 'ui-kit/shared/GoBack';
import { Title } from 'ui-kit/Title';
import { CreateObjectAdditionalInfoStage } from './CreateObjectAdditionalInfoStage';
import { CreateObjectAddressStage } from './CreateObjectAddressStage';
import { CreateObjectFinalStageModal } from './CreateObjectFinalStageModal';
import { CreateObjectMainInfoStage } from './CreateObjectMainInfoStage';
import { GridWrapper, PageHeaderSC, Wrapper } from './CreateObjectPage.styled';
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
  heatingStations,
  handlePostCreateObject,
  closePreviewModal,
  openPreviewModal,
  isPreviewModalOpen,
  openCreateHeatingStationModal,
  openEditHeatingStationModal,
  heatingStationCapture,
  isCreateLoading,
  handleOpenHouseManagementModal,
}) => {
  const { Step } = Steps;
  const stepTitles = [
    'Адрес объекта',
    'Основная информация',
    'Дополнительная информация',
  ];

  return (
    <Wrapper>
      <GoBack />
      <PageHeaderSC isGhost title="Добавление нового объекта" />

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
              heatingStations={heatingStations}
              openCreateHeatingStationModal={openCreateHeatingStationModal}
              openEditHeatingStationModal={openEditHeatingStationModal}
              heatingStationCapture={heatingStationCapture}
              handleOpenHouseManagementModal={handleOpenHouseManagementModal}
            />
          )}

          {stageNumber === 3 && (
            <CreateObjectAdditionalInfoStage
              goBackStage={goBackStage}
              onPageCancel={onPageCancel}
              createObjectData={createObjectData}
              handleSubmitCreateObject={handleSubmitCreateObject}
              openPreviewModal={openPreviewModal}
            />
          )}

          <CreateObjectFinalStageModal
            createObjectData={createObjectData}
            houseManagements={houseManagements}
            handlePostCreateObject={handlePostCreateObject}
            heatingStations={heatingStations}
            closePreviewModal={closePreviewModal}
            isPreviewModalOpen={isPreviewModalOpen}
            isCreateLoading={isCreateLoading}
          />
        </div>
        <div>
          <Title>Этапы создания</Title>
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
