import React from 'react';
import TabsDevices from './components/TabsDevices';
import { showDownloadDeviceReportButtonClicked } from '../../features/devicesReport/models';
import { MenuButtonTT } from '../../tt-components/MenuButtonTT';

export const DevicesFromSearch = () => {
  const menuButtonArr = [
    {
      title: 'Выгрузить список приборов',
      cb: showDownloadDeviceReportButtonClicked,
      show: true,
      color: 'default',
      clickable: true,
    },
  ];

  return (
    <div>
      <h1 style={{ fontWeight: 300, marginBottom: 16 }}>Приборы</h1>
      <MenuButtonTT menuButtonArr={menuButtonArr} />
      <TabsDevices />
    </div>
  );
};

export default DevicesFromSearch;
