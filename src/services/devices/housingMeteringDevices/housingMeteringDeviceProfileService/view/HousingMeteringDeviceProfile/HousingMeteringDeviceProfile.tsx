import { PageHeader } from '01/shared/ui/PageHeader';
import { EResourceType } from 'myApi';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { TrashIconSC } from 'ui-kit/DocumentsService/view/DocumentsLineUpload/DocumentsLineUpload.styled';
import { UserIcon } from 'ui-kit/icons';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { DeviceStatus } from 'ui-kit/shared_components/IndividualDeviceInfo/DeviceStatus';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { PencilIconSC } from 'ui-kit/shared_components/SelectedEntityPanel/SelectedEntityPanel.styled';
import { Tabs } from 'ui-kit/Tabs';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { HousingProfileTabs } from '../../housingMeteringDeviceProfileService.types';
import { CommonInfoTab } from './CommonInfo/CommonInfoTab';
import { ConnectionSettings } from './ConnectionSettings';
import { Documents } from './Documents';
import {
  CommentComponent,
  CommentDate,
  CommentHeader,
  CommentInfo,
  CommentText,
  CommentTitle,
  DeviceModel,
  DeviceNumber,
  DeviceTitle,
  IconSubstrate,
  MockComponent,
  PageGridContainer,
  PageTitle,
  RightBlock,
  RightButtonsBlock,
  UserName,
  Wrapper,
} from './HousingMeteringDeviceProfile.styled';
import { HousingMeteringDeviceProfileProps } from './HousingMeteringDeviceProfile.types';

export const HousingMeteringDeviceProfile: FC<HousingMeteringDeviceProfileProps> = ({
  deviceId,
  housingMeteringDevice,
  currentTab,
  handleChangeTab,
}) => {
  const { push } = useHistory();

  const deviceAddress = housingMeteringDevice?.address?.address?.mainAddress;
  const deviceModel = housingMeteringDevice?.model;
  const deviceNumber = housingMeteringDevice?.serialNumber;
  const isActive = housingMeteringDevice?.isActive;
  console.log(isActive);

  return (
    <Wrapper>
      <GoBack />

      <PageHeader
        title={
          <PageTitle>
            <DeviceTitle>
              <ResourceIconLookup resource={EResourceType.ColdWaterSupply} />
              <DeviceModel>{deviceModel}</DeviceModel>
              <DeviceNumber>{`(${deviceNumber})`}</DeviceNumber>
            </DeviceTitle>

            <HeaderInfoString>
              {deviceAddress?.city}
              {`${deviceAddress && getHousingStockItemAddress(deviceAddress)} `}
              {isActive && <DeviceStatus isActive={isActive} />}
            </HeaderInfoString>
          </PageTitle>
        }
        contextMenu={{
          menuButtons: [
            {
              title: 'Редактировать ОДПУ',
              onClick: () => {
                push(`/housingMeteringDevices/${deviceId}/edit_odpu`);
              },
              color: 'default',
            },
            {
              title: 'Поверка ОДПУ',
              onClick: () => {},
              color: 'default',
            },
            {
              title: 'Закрыть ОДПУ',
              onClick: () => {},
              color: 'red',
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
        <Tabs.TabPane tab="Общие данные" key={HousingProfileTabs.CommonInfo} />
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
          <CommentComponent>
            <CommentHeader>
              <CommentTitle>Комментарий</CommentTitle>
              <RightButtonsBlock>
                <PencilIconSC />
                <TrashIconSC />
              </RightButtonsBlock>
            </CommentHeader>

            <CommentText>
              Прибор иногда выходит из строя и сбиваются настройки соединения.
              Прошу коллег быть с ним более внимательными
            </CommentText>

            <CommentInfo>
              <IconSubstrate>
                <UserIcon />
              </IconSubstrate>
              <UserName>Филиппов А.А.</UserName>
              <CommentDate>12.08.2019 10:36 </CommentDate>
            </CommentInfo>
          </CommentComponent>

          <MockComponent>
            <h3>Задачи</h3>
          </MockComponent>
          <MockComponent>
            <h3>Документы</h3>
          </MockComponent>
        </RightBlock>
      </PageGridContainer>
    </Wrapper>
  );
};
