import { PageHeader } from '01/shared/ui/PageHeader';
import { EResourceType } from 'myApi';
import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { HeaderInfoString } from 'ui-kit/shared_components/HeaderInfoString';
import { DeviceStatus } from 'ui-kit/shared_components/IndividualDeviceInfo/DeviceStatus';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { Tabs } from 'ui-kit/Tabs';
import { getHousingStockItemAddress } from 'utils/getHousingStockItemAddress';
import { HousingProfileTabs } from '../../housingMeteringDeviceProfileService.types';
import { CommonInfo } from './CommonInfo';
import { ConnectionSettings } from './ConnectionSettings';
import { Documents } from './Documents';
import {
  DeviceName,
  DeviceNumber,
  Wrapper,
} from './HousingMeteringDeviceProfile.styled';
import { HousingMeteringDeviceProfileProps } from './HousingMeteringDeviceProfile.types';

export const HousingMeteringDeviceProfile: FC<HousingMeteringDeviceProfileProps> = ({}) => {
  const { push } = useHistory();
  
  console.log(deviceId);

  return (
    <Wrapper>
      <GoBack />

      <PageHeader
        title={
          <div>
            <ResourceIconLookup resource={EResourceType.ColdWaterSupply} />
            <DeviceName></DeviceName>
            <DeviceNumber></DeviceNumber>
            <HeaderInfoString>
              {/* {address?.city}
              {`${address && getHousingStockItemAddress(address)} `} */}
              abcd
              <DeviceStatus isActive={true} />
            </HeaderInfoString>
          </div>
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

      <Tabs onChange={() => {}}>
        <Tabs.TabPane tab="Общие данные" key={HousingProfileTabs.CommonInfo} />
        <Tabs.TabPane
          tab="Настройки соединения"
          key={HousingProfileTabs.ConnectionSettings}
        />
        <Tabs.TabPane tab="Документы" key={HousingProfileTabs.Documents} />
      </Tabs>

      {<CommonInfo />}
      {<ConnectionSettings />}
      {<Documents />}
    </Wrapper>
  );
};
