import React, { FC } from 'react';
import { AddIndividualDevicePageProps } from './AddIndividualDevicePage.types';
import { GoBack } from 'ui-kit/shared/GoBack';
import { Link, useParams } from 'react-router-dom';
import { Steps } from 'antd';
import {
  Address,
  Forms,
  PageGridContainer,
  StepsHeader,
  Title,
} from './AddIndividualDevicePage.styled';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import { DocumentsStage } from './stages/DocumentsStage';
import { BaseInfoStage } from './stages/BaseInfoStage';

export const AddIndividualDevicePage: FC<AddIndividualDevicePageProps> = ({
  stageNumber,
  apartment,
  handleGoPrevStage,
  contractors,
  modelNames,
  mountPlaces,
  handleFetchSerialNumberForCheck,
  isFetchSerialNumberLoading,
  serialNumberForChecking,
  handleSubmitForm,
  formData,
  documents,
  handleSubmitDocumentStage,
  isDocumentUploadLoading,
  handleFetchModels,
}) => {
  const { id } = useParams<{ id: string }>();
  const { Step } = Steps;
  const stepTitles = ['Общие данные о приборе', 'Документы'];

  const address = apartment && getApartmentAddressString(apartment, true);
  const apartmentId = apartment?.id || Number(id);

  return (
    <>
      <GoBack />
      <Title>Добавление нового прибора</Title>
      <Address>
        <Link to={`/apartments/${apartmentId}`}>{address}</Link>
      </Address>

      <PageGridContainer>
        <Forms>
          {stageNumber === 1 && (
            <BaseInfoStage
              contractors={contractors}
              modelNames={modelNames}
              mountPlaces={mountPlaces}
              handleFetchSerialNumberForCheck={handleFetchSerialNumberForCheck}
              isFetchSerialNumberLoading={isFetchSerialNumberLoading}
              serialNumberForChecking={serialNumberForChecking}
              handleSubmitForm={handleSubmitForm}
              apartmentId={apartmentId}
              formData={formData}
              handleFetchModels={handleFetchModels}
            />
          )}
          {stageNumber === 2 && (
            <DocumentsStage
              handleGoPrevStage={handleGoPrevStage}
              documents={documents}
              handleSubmitDocumentStage={handleSubmitDocumentStage}
              isDocumentUploadLoading={isDocumentUploadLoading}
            />
          )}
        </Forms>

        <div>
          <StepsHeader>Этапы создания</StepsHeader>
          <Steps direction="vertical" current={stageNumber - 1}>
            {stepTitles.map((step) => (
              <Step title={step} key={step} />
            ))}
          </Steps>
        </div>
      </PageGridContainer>
    </>
  );
};
