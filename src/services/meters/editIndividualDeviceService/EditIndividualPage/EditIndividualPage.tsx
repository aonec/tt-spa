import React, { FC, useMemo } from 'react';
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
import { GoBack } from 'ui-kit/shared/GoBack';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import { Tabs } from 'ui-kit/Tabs';
import { MainInfo } from './Tabs/MainInfo';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { DeviceStatus } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { usePermission } from 'hooks/usePermission';
import { ESecuredIdentityRoleName } from 'api/types';

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

  const isOperator = usePermission([
    ESecuredIdentityRoleName.Operator,
    ESecuredIdentityRoleName.SeniorOperator,
  ]);

  const tabItems = useMemo(
    () => [
      { label: 'Общая информация', key: EditIndividualDeviceTabs.CommonInfo },
    ],
    [],
  );

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
                  <DeviceNumber>{`(${individualDevice?.serialNumber})`}</DeviceNumber>
                  . Редактирование
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
            items={tabItems}
          />

          {currentTab === EditIndividualDeviceTabs.CommonInfo &&
            individualDevice && (
              <MainInfo
                individualDevice={individualDevice}
                handleUpdateDevice={handleUpdateDevice}
                mountPlaces={mountPlaces}
                onCancel={onCancel}
                isDeviceUpdating={isDeviceUpdating}
                isOperator={isOperator}
              />
            )}
        </>
      )}
    </Wrapper>
  );
};
