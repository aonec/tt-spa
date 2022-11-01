import React, { FC } from 'react';
import { Tabs } from 'antd';
import { PageHeader } from '01/shared/ui/PageHeader';
import { showDownloadDeviceReportButtonClicked } from '01/features/devicesReport/models';
import { DevicesProfileTabsType } from '../../devicesPageService.types';
import { Wrapper } from './DevicesPageProfile.styled';
import { DevicesPageProfileProps } from './DevicesPageProfile.types';
import { DevicesProfileContainer } from 'services/devices/devicesProfileService';
import { IndividualDevicesProfileContainer } from '../../individualDevicesProfileService';

export const DevicesPageProfile: FC<DevicesPageProfileProps> = ({
  type,
  setDevicesType,
}) => {
  const menuButtonArr = [
    {
      title: 'Выгрузить список приборов',
      onClick: showDownloadDeviceReportButtonClicked,
      show: true,
    },
  ];

  return (
    <Wrapper>
      <PageHeader
        title="Приборы"
        contextMenu={{ menuButtons: menuButtonArr }}
      />
      <Tabs
        activeKey={type}
        onChange={(activeKey) =>
          setDevicesType(activeKey as DevicesProfileTabsType)
        }
      >
        <Tabs.TabPane tab="ОДПУ" key={DevicesProfileTabsType.ODPU}>
          <DevicesProfileContainer />
        </Tabs.TabPane>
        <Tabs.TabPane tab="ИПУ" key={DevicesProfileTabsType.IndividualDevices}>
          <IndividualDevicesProfileContainer />
        </Tabs.TabPane>
      </Tabs>
    </Wrapper>
  );
};
