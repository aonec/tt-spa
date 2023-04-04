import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { stringifyUrl } from 'query-string';

import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { DeviceStatus } from 'ui-kit/shared_components/IndividualDeviceInfo/DeviceStatus';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { LinkCard } from 'ui-kit/shared_components/LinkCard';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { CheckHousingMeteringDeviceContainer } from 'services/housingMeteringDevices/housingMeteringDevices/checkHousingMeteringDeviceService';
import { CloseHousingMeteringDeviceContainer } from 'services/housingMeteringDevices/housingMeteringDevices/closeHousingMeteringDeviceService';

import { HousingProfileTabs } from '../../housingMeteringDeviceProfileService.types';
import { CommonInfoTab } from './CommonInfo/CommonInfoTab';
import { ConnectionSettings } from './ConnectionSettings';
import { Documents } from './Documents';
import {
  DeviceModel,
  DeviceNumber,
  DeviceTitle,
  PageGridContainer,
  PageHeaderSC,
  ResourceIconWrapper,
  RightBlock,
  TabsSC,
  Wrapper,
} from './HousingMeteringDeviceProfile.styled';
import { HousingMeteringDeviceProfileProps } from './HousingMeteringDeviceProfile.types';

const { TabPane } = TabsSC;

export const HousingMeteringDeviceProfile: FC<
  HousingMeteringDeviceProfileProps
> = ({
  deviceId,
  housingMeteringDevice,
  currentTab,
  handleChangeTab,
  housingMeteringDeviceTasks,
  handleCheckModalOpen,
  handleDeviceClosingModalOpen,
  isPermitionToCheckHousingMeteringDevice,
  isPermitionToCloseHousingMeteringDevice,
  isPermitionToEditHousingMeteringDevice,
}) => {
  const { push } = useHistory();

  const deviceAddress = housingMeteringDevice?.address?.address?.mainAddress;
  const deviceModel = housingMeteringDevice?.model;
  const deviceNumber = housingMeteringDevice?.serialNumber;
  const isActive = !Boolean(housingMeteringDevice?.closingDate);
  const resource = housingMeteringDevice?.resource;

  const tasksCount = housingMeteringDeviceTasks?.items?.length || 0;

  return (
    <>
      <CheckHousingMeteringDeviceContainer
        housingMeteringDevice={housingMeteringDevice}
      />
      <CloseHousingMeteringDeviceContainer
        housingMeteringDevice={housingMeteringDevice}
      />

      <Wrapper>
        <GoBack />

        <PageHeaderSC
          title={
            <div>
              <DeviceTitle>
                <ResourceIconWrapper>
                  {resource && <ResourceIconLookup resource={resource} />}
                </ResourceIconWrapper>
                <DeviceModel>{deviceModel}</DeviceModel>
                <DeviceNumber>{`(${deviceNumber})`}</DeviceNumber>
              </DeviceTitle>

              <HeaderInfoString>
                {deviceAddress?.city}
                {deviceAddress && getHousingStockItemAddress(deviceAddress)}
                <div>
                  Узел {housingMeteringDevice?.hubConnection?.node?.number}
                </div>
                {isActive !== undefined && isActive !== null && (
                  <DeviceStatus isActive={isActive} />
                )}
              </HeaderInfoString>
            </div>
          }
          contextMenu={{
            menuButtons: [
              {
                title: 'Редактировать ОДПУ',
                onClick: () => {
                  push(`/housingMeteringDevices/${deviceId}/edit`);
                },
                color: 'default',
                hidden: !isPermitionToEditHousingMeteringDevice,
              },
              {
                title: 'Поверка ОДПУ',
                onClick: () => handleCheckModalOpen(),
                color: 'default',
                hidden: !isPermitionToCheckHousingMeteringDevice,
              },
              {
                title: 'Закрыть ОДПУ',
                onClick: () => handleDeviceClosingModalOpen(),
                color: 'danger',
                hidden: !isPermitionToCloseHousingMeteringDevice,
              },
            ],
          }}
        />

        <TabsSC
          onChange={(value) => {
            handleChangeTab(value as HousingProfileTabs);
          }}
          activeKey={currentTab}
        >
          <TabPane tab="Общие данные" key={HousingProfileTabs.CommonInfo} />
          <TabPane
            tab="Настройки соединения"
            key={HousingProfileTabs.ConnectionSettings}
          />
          <TabPane tab="Документы" key={HousingProfileTabs.Documents} />
        </TabsSC>

        <PageGridContainer>
          {currentTab === HousingProfileTabs.CommonInfo && (
            <CommonInfoTab housingMeteringDevice={housingMeteringDevice} />
          )}
          {currentTab === HousingProfileTabs.ConnectionSettings && (
            <ConnectionSettings
              hubConnection={housingMeteringDevice?.hubConnection}
            />
          )}
          {currentTab === HousingProfileTabs.Documents && <Documents />}

          <RightBlock>
            <LinkCard
              text={`Задачи: ${tasksCount}`}
              link={stringifyUrl({
                url: '/tasks/list/Observing',
                query: { housingMeteringDeviceId: housingMeteringDevice?.id },
              })}
              showLink={Boolean(tasksCount)}
            />
          </RightBlock>
        </PageGridContainer>
      </Wrapper>
    </>
  );
};
