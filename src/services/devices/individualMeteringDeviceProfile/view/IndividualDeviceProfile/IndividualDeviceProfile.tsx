import React, { FC, useState } from 'react';
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
import moment from 'moment';
import { DeviceStatus } from 'ui-kit/shared/IndividualDeviceInfo/DeviceStatus';
import { ReadingsHistoryContainer } from 'services/meters/readingsHistoryService/readingsHistoryService.container';

export const IndividualDeviceProfile: FC<Props> = ({ device }) => {
  const [currentTab, setCurrentTab] = useState<IndividualDeviceProfileTab>(
    IndividualDeviceProfileTab.Info,
  );

  const isActive = device.closingDate === null;

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
              },
            ],
          }}
        />
        <AddressWrapper>
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
          >
            <Tabs.TabPane
              tab="Общие данные"
              key={IndividualDeviceProfileTab.Info}
            >
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
                      value: moment(device.openingDate).format('DD.MM.YYYY'),
                    },
                    {
                      key: 'Дата последней поверки',
                      value: moment(device.lastCheckingDate).format(
                        'DD.MM.YYYY',
                      ),
                    },
                    {
                      key: 'Дата следующей поверки',
                      value: moment(device.futureCheckingDate).format(
                        'DD.MM.YYYY',
                      ),
                    },
                    {
                      key: 'Магнитная пломба',
                      value: device.magneticSealTypeName,
                    },
                    {
                      key: 'Дата установки пломбы',
                      value:
                        device.magneticSealInstallationDate &&
                        moment(device.magneticSealInstallationDate).format(
                          'DD.MM.YYYY',
                        ),
                    },
                  ]}
                />
              </CommonInfoWrapper>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab="История показаний"
              key={IndividualDeviceProfileTab.ReadingsHistory}
            >
              <ReadingsHistoryWrapper>
                <ReadingsHistoryContainer
                  readonly
                  deviceId={device.id}
                  isModal={false}
                  showDeviceInfo={false}
                />
              </ReadingsHistoryWrapper>
            </Tabs.TabPane>
          </Tabs>
        </Content>
      </HeaderWrapper>
    </div>
  );
};