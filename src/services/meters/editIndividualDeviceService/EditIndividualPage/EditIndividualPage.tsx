import React, { FC } from 'react';
import {
  Address,
  DeviceModel,
  DeviceNumber,
  DeviceTitle,
  LoaderWrapper,
  PageTitle,
  ResourceIconLookupWrapper,
  SubTitleWrapper,
  Wrapper,
} from './EditIndividualPage.styled';
import {
  EditIndividualDeviceTabs,
  EditIndividualPageProps,
} from './EditIndividualPage.types';
import { GoBack } from 'ui-kit/sharedComponents/GoBack';
import { WithLoader } from 'ui-kit/sharedComponents/WithLoader';
import { Tabs } from 'ui-kit/Tabs';
import { MainInfo } from './Tabs/MainInfo';
import { Documents } from './Tabs/Documents';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { ResourceIconLookup } from 'ui-kit/sharedComponents/ResourceIconLookup';
import { DeviceStatus } from 'ui-kit/sharedComponents/IndividualDeviceInfo/DeviceStatus';
import { PageHeader } from 'ui-kit/sharedComponents/PageHeader';

export const EditIndividualPage: FC<EditIndividualPageProps> = ({
  currentTab,
  handleChangeTab,
  individualDevice,
  isDeviceLoading,
  handleUpdateDevice,
  mountPlaces,
  onCancel,
  isDeviceUpdating,
}) => {
  const address = individualDevice?.address;

  return (
    <Wrapper>
      <GoBack />

      <LoaderWrapper>
        <WithLoader isLoading={isDeviceLoading} />
      </LoaderWrapper>

      {!isDeviceLoading && (
        <>
          <PageHeader
            title={
              <PageTitle>
                <DeviceTitle>
                  {individualDevice?.resource && (
                    <ResourceIconLookupWrapper>
                      <ResourceIconLookup
                        resource={individualDevice?.resource}
                      />
                    </ResourceIconLookupWrapper>
                  )}
                  <DeviceModel>{individualDevice?.model}</DeviceModel>
                  <DeviceNumber>{`(${individualDevice?.serialNumber}). Редактирование`}</DeviceNumber>
                </DeviceTitle>
                <SubTitleWrapper>
                  <Address to={`/apartments/${address?.apartmentId}`}>
                    {address && getApartmentFromFullAddress(address, true)}
                  </Address>
                  <DeviceStatus isActive={!individualDevice?.closingDate} />
                </SubTitleWrapper>
              </PageTitle>
            }
          />

          <Tabs
            onChange={(value) => {
              handleChangeTab(value as EditIndividualDeviceTabs);
            }}
            activeKey={currentTab}
          >
            <Tabs.TabPane
              tab="Общая информация"
              key={EditIndividualDeviceTabs.CommonInfo}
            />
            <Tabs.TabPane
              tab="Документы"
              key={EditIndividualDeviceTabs.Documents}
            />
          </Tabs>

          {currentTab === EditIndividualDeviceTabs.CommonInfo &&
            individualDevice && (
              <MainInfo
                individualDevice={individualDevice}
                handleUpdateDevice={handleUpdateDevice}
                mountPlaces={mountPlaces}
                onCancel={onCancel}
                isDeviceUpdating={isDeviceUpdating}
              />
            )}
          {currentTab === EditIndividualDeviceTabs.Documents && <Documents />}
        </>
      )}
    </Wrapper>
  );
};
