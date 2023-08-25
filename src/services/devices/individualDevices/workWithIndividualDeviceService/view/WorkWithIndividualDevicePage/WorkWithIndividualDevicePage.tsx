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
import { useHistory } from 'react-router-dom';
import { Button } from 'ui-kit/Button';

export const WorkWithIndividualDevicePage: FC<
  WorkWithIndividualDevicePageProps
> = ({
  individualDevice,
  type,
  form,
  contractors,
  handleFetchSerialNumberForCheck,
  serialNumberForChecking,
  isSerialNumberLoading,
  handleFetchModels,
  models,
}) => {
  const history = useHistory();

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
              form={form}
              contractors={contractors}
              handleFetchSerialNumberForCheck={handleFetchSerialNumberForCheck}
              serialNumberForChecking={serialNumberForChecking}
              isSerialNumberLoading={isSerialNumberLoading}
              handleFetchModels={handleFetchModels}
              models={models}
              individualDevice={individualDevice}
            />
            <FooterWrapper>
              <Button type="ghost" onClick={history.goBack}>
                Отмена
              </Button>
              <Button onClick={() => form.submit()}>Далее</Button>
            </FooterWrapper>
          </ContentWrapper>
        </>
      )}
    </>
  );
};
