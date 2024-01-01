import { PageHeader } from 'ui-kit/shared/PageHeader';
import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoBack } from 'ui-kit/shared/GoBack';
import { HeaderInfoString } from 'ui-kit/shared/HeaderInfoString';
import { DeviceStatus } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus';
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

export const EditHousingMeteringDevicePage: FC<
  EditHousingMeteringDevicePageProps
> = ({
  currentTab,
  handleChangeTab,
  housingMeteringDevice,
  handleSubmitForm,
  deviceId,
  communicationPipes,
}) => {
  const address = housingMeteringDevice?.address?.address?.mainAddress;
  const isActive = !Boolean(housingMeteringDevice?.closingDate);

  const navigate = useNavigate();
  const onCancel = () => navigate(-1);

  const tabItems = useMemo(
    () => [
      { label: 'Общие данные', key: EditHousingMeteringDeviceTabs.CommonInfo },
      { label: 'Документы', key: EditHousingMeteringDeviceTabs.Documents },
    ],
    [],
  );

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
              {address && getHousingStockItemAddress(address)}
              <div>
                Узел {housingMeteringDevice?.hubConnection?.node?.title}
              </div>
              <DeviceStatus isActive={isActive} />
            </HeaderInfoString>
          </PageTitle>
        }
      />

      <Tabs
        onChange={(value) => {
          handleChangeTab(value as EditHousingMeteringDeviceTabs);
        }}
        activeKey={currentTab}
        items={tabItems}
      />

      {currentTab === EditHousingMeteringDeviceTabs.CommonInfo && (
        <EditHousingMeteringDeviceCommonInfo
          housingMeteringDevice={housingMeteringDevice}
          handleSubmitForm={handleSubmitForm}
          deviceId={deviceId}
          onCancel={onCancel}
          communicationPipes={communicationPipes}
        />
      )}
      {currentTab === EditHousingMeteringDeviceTabs.Documents && (
        <EditHousingMeteringDeviceDocuments />
      )}
    </Wrapper>
  );
};
