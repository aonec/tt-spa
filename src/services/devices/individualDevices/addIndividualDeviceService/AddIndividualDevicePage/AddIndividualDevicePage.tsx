import React, { FC, useMemo } from 'react';
import { AddIndividualDevicePageProps } from './AddIndividualDevicePage.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { Link } from 'react-router-dom';
import { Steps } from 'antd';
import {
  Address,
  Forms,
  PageGridContainer,
  StepsHeader,
  Title,
} from './AddIndividualDevicePage.styled';
import { getApartmentAddressString } from 'utils/getApartmentAddress';
import { Button } from 'ui-kit/Button';
import { DocumentsStage } from './stages/DocumentsStage';
import { BaseInfoStage } from './stages/BaseInfoStage';

export const AddIndividualDevicePage: FC<AddIndividualDevicePageProps> = ({
  stageNumber,
  apartment,
  handleGoNextStage,
  handleGoPrevStage,
  contractors,
  modelNames,
  mountPlaces,
  handleFetchSerialNumberForCheck,
  isFetchSerialNumberLoading,
  serialNumberForChecking,
  handleSubmitForm,
}) => {
  const { Step } = Steps;
  const stepTitles = ['Общие данные о приборе', 'Документы'];

  const address = apartment && getApartmentAddressString(apartment, true);
  const apartmentId = apartment?.id;

  const getFirstButton = useMemo(() => {
    if (stageNumber === 2) {
      return (
        <Button type="ghost" onClick={handleGoPrevStage}>
          Назад
        </Button>
      );
    }
  }, [stageNumber, handleGoPrevStage]);

  const getSecondButton = useMemo(() => {
    return (
      <Button onClick={handleGoNextStage}>
        {stageNumber === 1 && 'Далее'}
        {stageNumber === 2 && 'Сохранить изменения'}
      </Button>
    );
  }, [stageNumber, handleGoNextStage]);

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
            />
          )}
          {stageNumber === 2 && <DocumentsStage />}
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
