import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { GoBack } from 'ui-kit/shared/GoBack';
import { HeaderInfoString } from 'ui-kit/shared/HeaderInfoString';
import { DeviceStatus } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { LinkCard } from 'ui-kit/shared/LinkCard';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { CheckHousingMeteringDeviceContainer } from 'services/devices/housingMeteringDevices/checkHousingMeteringDeviceService';
import { CloseHousingMeteringDeviceContainer } from 'services/devices/housingMeteringDevices/closeHousingMeteringDeviceService';

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
import { ContextMenuButtonColor } from 'ui-kit/ContextMenuButton/ContextMenuButton.types';
import { TaskGroupingFilter } from 'api/types';

export const HousingMeteringDeviceProfile: FC<
  HousingMeteringDeviceProfileProps
> = ({
  deviceId,
  housingMeteringDevice,
  currentTab = HousingProfileTabs.CommonInfo,
  handleChangeTab,
  housingMeteringDeviceTasks,
  handleCheckModalOpen,
  handleDeviceClosingModalOpen,
  isPermitionToCheckHousingMeteringDevice,
  isPermitionToCloseHousingMeteringDevice,
  isPermitionToEditHousingMeteringDevice,
}) => {
  const navigate = useNavigate();

  const deviceAddress = housingMeteringDevice?.address?.address?.mainAddress;
  const deviceModel = housingMeteringDevice?.model;
  const deviceNumber = housingMeteringDevice?.serialNumber;
  const isActive = !housingMeteringDevice?.closingDate;
  const resource = housingMeteringDevice?.resource;

  const tasksCount = housingMeteringDeviceTasks?.items?.length || 0;

  const tabItems = useMemo(
    () => [
      { label: 'Общие данные', key: HousingProfileTabs.CommonInfo },
      {
        label: 'Настройки соединения',
        key: HousingProfileTabs.ConnectionSettings,
      },
      { label: 'Документы', key: HousingProfileTabs.Documents },
    ],
    [],
  );

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
                  Узел {housingMeteringDevice?.hubConnection?.node?.title}
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
                  navigate(`/housingMeteringDevices/${deviceId}/edit`);
                },
                hidden: !isPermitionToEditHousingMeteringDevice,
              },
              {
                title: 'Поверка ОДПУ',
                onClick: () => handleCheckModalOpen(),
                hidden: !isPermitionToCheckHousingMeteringDevice,
              },
              {
                title: 'Закрыть ОДПУ',
                onClick: () => handleDeviceClosingModalOpen(),
                color: ContextMenuButtonColor.danger,
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
          items={tabItems}
        />

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
              link={queryString.stringifyUrl({
                url: `/tasks/list/${TaskGroupingFilter.Executing}`,
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
