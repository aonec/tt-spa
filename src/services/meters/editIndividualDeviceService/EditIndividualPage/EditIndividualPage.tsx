import React, { FC } from 'react';
import {
  DeviceModel,
  DeviceNumber,
  DeviceTitle,
  LoaderWrapper,
  Wrapper,
} from './EditIndividualPage.styled';
import {
  EditIndividualDeviceTabs,
  EditIndividualPageProps,
} from './EditIndividualPage.types';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { WithLoader } from 'ui-kit/shared_components/WithLoader';
import { PageTitle } from '01/shared/ui/Title';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { Tabs } from 'ui-kit/Tabs';
import { MainInfo } from './Tabs/MainInfo';
import { Documents } from './Tabs/Documents';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { PageHeader } from '01/shared/ui/PageHeader';

export const EditIndividualPage: FC<EditIndividualPageProps> = ({
  currentTab,
  handleChangeTab,
  individualDevice,
  isDeviceLoading,
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
                  <DeviceModel>{individualDevice?.model}</DeviceModel>
                  <DeviceNumber>{`(${individualDevice?.serialNumber}). Редактирование`}</DeviceNumber>
                </DeviceTitle>

                <HeaderInfoString>
                  {address?.city}
                  {address && getApartmentFromFullAddress(address, true)}
                </HeaderInfoString>
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
              tab="Общие данные"
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
                // onCancel={onCancel}
                // onSubmit={handleSubmit}
              />
            )}
          {currentTab === EditIndividualDeviceTabs.Documents && <Documents />}
        </>
      )}
    </Wrapper>
  );
};
