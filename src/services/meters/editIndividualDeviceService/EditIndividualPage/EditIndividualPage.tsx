import React, { FC } from 'react';
import {
  Address,
  DeviceModel,
  DeviceNumber,
  DeviceTitle,
  LoaderWrapper,
  PageTitle,
  SubTitleWrapper,
  Wrapper,
} from './EditIndividualPage.styled';
import {
  EditIndividualDeviceTabs,
  EditIndividualPageProps,
} from './EditIndividualPage.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { Tabs } from 'ui-kit/Tabs';
import { MainInfo } from './Tabs/MainInfo';
import { Documents } from './Tabs/Documents';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { PageHeader } from '01/shared/ui/PageHeader';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import IsActive from '01/tt-components/IsActive';

export const EditIndividualPage: FC<EditIndividualPageProps> = ({
  currentTab,
  handleChangeTab,
  individualDevice,
  isDeviceLoading,
  handleUpdateDevice,
  mountPlaces,
  onCancel,
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
                    <ResourceIconLookup
                      resource={individualDevice?.resource}
                      style={{
                        transform: 'scale(1.3)',
                        margin: '0px 16px 0px 6px',
                      }}
                    />
                  )}
                  <DeviceModel>{individualDevice?.model}</DeviceModel>
                  <DeviceNumber>{`(${individualDevice?.serialNumber}). Редактирование`}</DeviceNumber>
                </DeviceTitle>
                <SubTitleWrapper>
                  <Address to={`/apartments/${address?.apartmentId}`}>
                    {address && getApartmentFromFullAddress(address, true)}
                  </Address>
                  <IsActive closingDate={individualDevice?.closingDate} />
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
              />
            )}
          {currentTab === EditIndividualDeviceTabs.Documents && <Documents />}
        </>
      )}
    </Wrapper>
  );
};