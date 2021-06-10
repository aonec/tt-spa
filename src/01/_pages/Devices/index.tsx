import React from 'react';
import TabsDevices from './components/TabsDevices';
import { showDownloadDeviceReportButtonClicked } from '../../features/devicesReport/models';
import { MenuButtonTT } from '../../tt-components/MenuButtonTT';
import styled from 'styled-components';

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
      <HeaderWrapper>
        <h1 style={{ fontWeight: 300, marginBottom: 16 }}>Приборы</h1>
        <MenuButtonTT menuButtonArr={menuButtonArr} />
      </HeaderWrapper>
      <TabsDevices />
    </div>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default DevicesFromSearch;
