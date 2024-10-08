import React, { FC } from 'react';
import { WorkWithIndividualDevicePageProps } from './WorkWithIndividualDevicePage.types';
import { GoBack } from 'ui-kit/shared/GoBack';
import {
  ContentWrapper,
  DeviceInfoWrapper,
  FooterWrapper,
  ModelWrapper,
  PageHeaderSC,
  SerialNumberWrapper,
} from './WorkWithIndividualDevicePage.styled';
import { WorkWithIndividualDevicePageTitle } from './WorkWithIndividualDevicePage.constants';
import { Empty } from 'antd';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { WorkWithIndividualDeviceForm } from './WorkWithIndividualDeviceForm';
import { useNavigate } from 'react-router-dom';
import { Button } from 'ui-kit/Button';

export const WorkWithIndividualDevicePage: FC<
  WorkWithIndividualDevicePageProps
> = ({
  individualDevice,
  type,
  contractors,
  handleFetchSerialNumberForCheck,
  serialNumberForChecking,
  isSerialNumberLoading,
  handleFetchModels,
  models,
  onSubmitCapture,
  handleSubmitForm,
  deviceInfoForm,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <GoBack />
      <PageHeaderSC title={WorkWithIndividualDevicePageTitle[type]} />
      {!individualDevice && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Возникла ошибка при загрузки ИПУ"
        />
      )}
      {individualDevice && (
        <>
          <DeviceInfoWrapper>
            <span>
              {getApartmentFromFullAddress(individualDevice.address, true)}
            </span>
            <ResourceIconLookup resource={individualDevice.resource} />
            <SerialNumberWrapper>
              {individualDevice.serialNumber}
            </SerialNumberWrapper>
            <ModelWrapper>{individualDevice.model}</ModelWrapper>
          </DeviceInfoWrapper>
          <ContentWrapper>
            <WorkWithIndividualDeviceForm
              type={type}
              contractors={contractors}
              handleFetchSerialNumberForCheck={handleFetchSerialNumberForCheck}
              serialNumberForChecking={serialNumberForChecking}
              isSerialNumberLoading={isSerialNumberLoading}
              handleFetchModels={handleFetchModels}
              models={models}
              individualDevice={individualDevice}
              onSubmitCapture={onSubmitCapture}
              handleSubmitForm={handleSubmitForm}
              deviceInfoForm={deviceInfoForm}
            />
            <FooterWrapper>
              <Button type="ghost" onClick={() => navigate(-1)}>
                Отмена
              </Button>
              <Button onClick={() => onSubmitCapture()}>Далее</Button>
            </FooterWrapper>
          </ContentWrapper>
        </>
      )}
    </>
  );
};
