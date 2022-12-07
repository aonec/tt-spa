import React, { FC } from 'react';
import { Tabs } from 'antd';
import { PageHeader } from '01/shared/ui/PageHeader';
import { showDownloadDeviceReportButtonClicked } from '01/features/devicesReport/models';
import { TabsSC } from './DevicesPageProfile.styled';
import { DevicesPageProfileProps } from './DevicesPageProfile.types';
import { DevicesProfileContainer } from 'services/devices/devicesProfileService';
import { IndividualDevicesProfileContainer } from '../../individualDevicesProfileService';
import { DevicesProfileTabsType } from '../../devicesPageService.types';

export const DevicesPageProfile: FC<DevicesPageProfileProps> = ({
  type,
  setDevicesType,
  handleAddNode,
}) => {
  const menuButtonArr = [
    {
      title: 'Выгрузить список ОДПУ',
      onClick: showDownloadDeviceReportButtonClicked,
      hidden: type !== DevicesProfileTabsType.ODPU,
    },
    {
      title: 'Добавить узел',
      onClick: handleAddNode,
    },
  ];

  return (
    <>
      <PageHeader
        title="Приборы"
        contextMenu={{ menuButtons: menuButtonArr }}
      />

      <TabsSC
        activeKey={type}
        onChange={(activeKey) =>
          setDevicesType(activeKey as DevicesProfileTabsType)
        }
      >
        <TabsSC.TabPane tab="ОДПУ" key={DevicesProfileTabsType.ODPU}>
          <DevicesProfileContainer />
        </TabsSC.TabPane>
        <TabsSC.TabPane
          tab="ИПУ"
          key={DevicesProfileTabsType.IndividualDevices}
        >
          <IndividualDevicesProfileContainer />
        </TabsSC.TabPane>
      </TabsSC>
    </>
  );
};
