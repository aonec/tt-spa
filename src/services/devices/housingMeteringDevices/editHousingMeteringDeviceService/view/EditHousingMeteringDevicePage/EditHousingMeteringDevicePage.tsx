import { PageHeader } from '01/shared/ui/PageHeader';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { DeviceStatus } from 'ui-kit/shared_components/IndividualDeviceInfo/DeviceStatus';
import { Tabs } from 'ui-kit/Tabs';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { EditHousingMeteringDeviceTabs } from '../../editHousingMeteringDeviceService.types';
import {
  DeviceModel,
  DeviceNumber,
  DeviceTitle,
  PageTitle,
  Wrapper,
} from './EditHousingMeteringDevicePage.styled';
import { EditHousingMeteringDevicePageProps } from './EditHousingMeteringDevicePage.types';
import { EditHousingMeteringDeviceCommonInfo } from './Tabs/EditHousingMeteringDeviceCommonInfo';
import { EditHousingMeteringDeviceDocuments } from './Tabs/EditHousingMeteringDeviceDocuments';

export const EditHousingMeteringDevicePage: FC<EditHousingMeteringDevicePageProps> = ({
  currentTab,
  handleChangeTab,
  housingMeteringDevice,
  handleSubmitForm,
  deviceId,
}) => {
  const address = housingMeteringDevice?.address?.address?.mainAddress;

  const history = useHistory();
  const onCancel = () => history.goBack();

  return (
    <Wrapper>
      <GoBack />

      <PageHeader
        title={
          <PageTitle>
            <DeviceTitle>
              <DeviceModel>{housingMeteringDevice?.model}</DeviceModel>
              <DeviceNumber>{`(${housingMeteringDevice?.serialNumber}). Редактирование`}</DeviceNumber>
            </DeviceTitle>

            <HeaderInfoString>
              {address?.city}
              {`${address && getHousingStockItemAddress(address)} `}
              {housingMeteringDevice?.isActive !== undefined &&
                housingMeteringDevice?.isActive !== null && (
                  <DeviceStatus isActive={housingMeteringDevice?.isActive} />
                )}
            </HeaderInfoString>
          </PageTitle>
        }
      />

      <Tabs
        onChange={(value) => {
          handleChangeTab(value as EditHousingMeteringDeviceTabs);
        }}
        activeKey={currentTab}
      >
        <Tabs.TabPane
          tab="Общие данные"
          key={EditHousingMeteringDeviceTabs.CommonInfo}
        />
        <Tabs.TabPane
          tab="Документы"
          key={EditHousingMeteringDeviceTabs.Documents}
        />
      </Tabs>

      {currentTab === EditHousingMeteringDeviceTabs.CommonInfo && (
        <EditHousingMeteringDeviceCommonInfo
          housingMeteringDevice={housingMeteringDevice}
          handleSubmitForm={handleSubmitForm}
          deviceId={deviceId}
          onCancel={onCancel}
        />
      )}
      {currentTab === EditHousingMeteringDeviceTabs.Documents && (
        <EditHousingMeteringDeviceDocuments />
      )}
    </Wrapper>
  );
};
