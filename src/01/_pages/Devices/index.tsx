import React from 'react';
import TabsDevices from './components/TabsDevices';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { DevicePageType } from '../../Redux/rootReducer';

export const DevicesFromSearch = () => {
  return (
    <div>
      <h1 style={{ fontWeight: 300, marginBottom: 16 }}>Приборы</h1>
      <TabsDevices />
    </div>
  );
};

export default DevicesFromSearch;
