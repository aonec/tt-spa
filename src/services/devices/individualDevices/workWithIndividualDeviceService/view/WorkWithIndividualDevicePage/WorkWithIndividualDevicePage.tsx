import React, { FC } from 'react';
import { WorkWithIndividualDevicePageProps } from './WorkWithIndividualDevicePage.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import {
  ContentWrapper,
  DeviceInfoWrapper,
  ModelWrapper,
  PageHeaderSC,
  SerialNumberWrapper,
} from './WorkWithIndividualDevicePage.styled';
import { WorkWithIndividualDevicePageTitle } from './WorkWithIndividualDevicePage.constants';
import { Empty } from 'antd';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';

export const WorkWithIndividualDevicePage: FC<
  WorkWithIndividualDevicePageProps
> = ({
  individualDevice,
  type,
  form,
  contractors,
  handleFetchSerialNumberForCheck,
  isSerialNumberAllreadyExist,
  isSerialNumberLoading,
  handleFetchModels,
  models,
}) => {
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
          <ContentWrapper></ContentWrapper>
        </>
      )}
    </>
  );
};
