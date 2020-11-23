import React, { useState } from 'react';
import { Header } from '../../tt-components';
import SettingsTabs from './components/SettingsTabs';
import Common from './components/Common';
import Staff from './components/Staff';
import Contractors from './components/Contractors';

export const Settings = () => {
  console.log('Settings');
  const [currentTabKey, setTab] = useState('1');
  function handleChangeTab(value) {
    setTab(value);
    console.log('currentTabKey', currentTabKey);
  }
  return (
    <div>
      <Header>Настройки</Header>
      <SettingsTabs currentTabKey={currentTabKey} handleChangeTab={handleChangeTab} />
      {Number(currentTabKey) === 1 ? <Common /> : null }
      {Number(currentTabKey) === 2 ? <Staff /> : null }
      {Number(currentTabKey) === 3 ? <Contractors /> : null }
    </div>
  );
};

export default Settings;
