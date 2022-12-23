import { PageHeader } from '01/shared/ui/PageHeader';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { CommentPanel } from 'ui-kit/shared_components/CommentPanel';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { DeviceStatus } from 'ui-kit/shared_components/IndividualDeviceInfo/DeviceStatus';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { Tabs } from 'ui-kit/Tabs';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { HousingProfileTabs } from '../../housingMeteringDeviceProfileService.types';
import { CommonInfoTab } from './CommonInfo/CommonInfoTab';
import { ConnectionSettings } from './ConnectionSettings';
import { Documents } from './Documents';
import {
  DeviceModel,
  DeviceNumber,
  DeviceTitle,
  LinkSC,
  MockComponent,
  PageGridContainer,
  PageTitle,
  RightBlock,
  Tasks,
  TasksWrapper,
  Wrapper,
} from './HousingMeteringDeviceProfile.styled';
import { HousingMeteringDeviceProfileProps } from './HousingMeteringDeviceProfile.types';
import { CheckHousingMeteringDeviceContainer } from 'services/devices/housingMeteringDevices/checkHousingMeteringDeviceService';
import { CloseHousingMeteringDeviceContainer } from 'services/devices/housingMeteringDevices/closeHousingMeteringDeviceService';

export const HousingMeteringDeviceProfile: FC<HousingMeteringDeviceProfileProps> = ({
  deviceId,
  housingMeteringDevice,
  currentTab,
  handleChangeTab,
  housingMeteringDeviceTasks,
  handleCheckModalOpen,
  handleDeviceClosingModalOpen,
}) => {
  const { push } = useHistory();

  const deviceAddress = housingMeteringDevice?.address?.address?.mainAddress;
  const deviceModel = housingMeteringDevice?.model;
  const deviceNumber = housingMeteringDevice?.serialNumber;
  const isActive = !Boolean(housingMeteringDevice?.closingDate);
  const resource = housingMeteringDevice?.resource;

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

        <PageHeader
          title={
            <PageTitle>
              <DeviceTitle>
                {resource && <ResourceIconLookup resource={resource} />}
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
            </PageTitle>
          }
          contextMenu={{
            menuButtons: [
              {
                title: 'Редактировать ОДПУ',
                onClick: () => {
                  push(`/housingMeteringDevices/${deviceId}/edit`);
                },
                color: 'default',
              },
              {
                title: 'Поверка ОДПУ',
                onClick: () => handleCheckModalOpen(),
                color: 'default',
              },
              {
                title: 'Закрыть ОДПУ',
                onClick: () => handleDeviceClosingModalOpen(),
                color: 'danger',
              },
            ],
          }}
        />

        <Tabs
          onChange={(value) => {
            handleChangeTab(value as HousingProfileTabs);
          }}
          activeKey={currentTab}
        >
          <Tabs.TabPane
            tab="Общие данные"
            key={HousingProfileTabs.CommonInfo}
          />
          <Tabs.TabPane
            tab="Настройки соединения"
            key={HousingProfileTabs.ConnectionSettings}
          />
          <Tabs.TabPane tab="Документы" key={HousingProfileTabs.Documents} />
        </Tabs>

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
            <MockComponent>
              <TasksWrapper>
                <Tasks>
                  Задачи: {housingMeteringDeviceTasks?.items?.length || 0}
                </Tasks>

                {housingMeteringDeviceTasks?.items?.length ? (
                  <LinkSC to={`/tasks/list/`} target="_blank">
                    {'Перейти >'}
                  </LinkSC>
                ) : (
                  ''
                )}
              </TasksWrapper>
            </MockComponent>
          </RightBlock>
        </PageGridContainer>
      </Wrapper>
    </>
  );
};
