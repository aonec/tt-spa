import React, { FC, ReactNode, useMemo, useState } from 'react';
import {
  AddressWrapper,
  CommonInfoWrapper,
  Content,
  DeviceTitle,
  HeaderWrapper,
  ReadingsHistoryWrapper,
  SerialNumber,
} from './IndividualDeviceProfile.styled';
import {
  IndividualDeviceProfileTab,
  Props,
} from './IndividualDeviceProfile.types';
import { GoBack } from 'ui-kit/shared/GoBack';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { ResourceIconLookup } from 'ui-kit/shared/ResourceIconLookup';
import { getApartmentFromFullAddress } from 'utils/getApartmentFromFullAddress';
import { Tabs } from 'ui-kit/Tabs';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { resourceNamesLookup } from 'utils/resourceNamesLookup';
import dayjs from 'api/dayjs';
import { DeviceStatus } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus';
import { ReadingsHistoryContainer } from 'services/meters/readingsHistoryService/readingsHistoryService.container';
import {  useNavigate } from 'react-router-dom';

export const IndividualDeviceProfile: FC<Props> = ({ device }) => {
  const [currentTab, setCurrentTab] = useState<IndividualDeviceProfileTab>(
    IndividualDeviceProfileTab.Info,
  );

  const isActive = device.closingDate === null;

  const history =  useNavigate();

  const tabItems = useMemo(
    () => [
      { label: 'Общие данные', key: IndividualDeviceProfileTab.Info },
      {
        label: 'История показаний',
        key: IndividualDeviceProfileTab.ReadingsHistory,
      },
    ],
    [],
  );

  const component: { [key in IndividualDeviceProfileTab]: ReactNode } = {
    [IndividualDeviceProfileTab.Info]: (
      <CommonInfoWrapper>
        <CommonInfo
          items={[
            {
              key: 'Тип ресурса',
              value: resourceNamesLookup[device.resource],
            },
            {
              key: 'Место установки',
              value: device.deviceMountPlace?.description,
            },
            {
              key: 'Разрядность',
              value: device.bitDepth,
            },
            {
              key: 'Множитель',
              value: device.scaleFactor,
            },
            {
              key: 'Дата ввода в эксплуатацию',
              value: dayjs(device.openingDate).format('DD.MM.YYYY'),
            },
            {
              key: 'Дата последней поверки',
              value: dayjs(device.lastCheckingDate).format('DD.MM.YYYY'),
            },
            {
              key: 'Дата следующей поверки',
              value: dayjs(device.futureCheckingDate).format('DD.MM.YYYY'),
            },
            {
              key: 'Пломба',
              value: device.sealNumber,
            },
            {
              key: 'Дата установки пломбы',
              value:
                device.sealInstallationDate &&
                dayjs(device.sealInstallationDate).format('DD.MM.YYYY'),
            },
          ]}
        />
      </CommonInfoWrapper>
    ),
    [IndividualDeviceProfileTab.ReadingsHistory]: (
      <ReadingsHistoryWrapper>
        <ReadingsHistoryContainer
          readonly
          deviceId={device.id}
          isModal={false}
          showDeviceInfo={false}
        />
      </ReadingsHistoryWrapper>
    ),
    [IndividualDeviceProfileTab.Documents]: null,
  };

  return (
    <div>
      <GoBack />
      <HeaderWrapper>
        <PageHeader
          title={
            <DeviceTitle>
              <ResourceIconLookup
                style={{ width: 28, height: 28 }}
                resource={device.resource}
              />
              {device.model}{' '}
              <SerialNumber>({device.serialNumber})</SerialNumber>
            </DeviceTitle>
          }
          contextMenu={{
            menuButtons: [
              {
                title: 'Редактировать',
                onClick: () =>
                   history(`/individualDevices/${device.id}/edit`),
              },
            ],
          }}
        />
        <AddressWrapper to={`/apartments/${device.address?.apartmentId}`}>
          {getApartmentFromFullAddress(device.address, true)}
          <DeviceStatus
            isActive={isActive}
            closingReason={device.closingReason}
          />
        </AddressWrapper>
        <Content>
          <Tabs
            activeKey={currentTab}
            onChange={(key) => setCurrentTab(key as IndividualDeviceProfileTab)}
            items={tabItems}
          />
          {component[currentTab]}
        </Content>
      </HeaderWrapper>
    </div>
  );
};
