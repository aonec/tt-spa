import React, { useEffect, useState } from 'react';
import { Header } from '../../tt-components';
import SettingsTabs from './components/SettingsTabs';
import Common from './components/Common';
import Staff from './components/Staff';
import Contractors from './components/Contractors';
import { getCurrentManagingFirm } from './apiSettings';

export const Settings = () => {
  console.log('Settings');
  const [currentTabKey, setTab] = useState('1');
  const [firm, setFirm] = useState();
  useEffect(() => {
    getCurrentManagingFirm().then((res) => {
      setFirm(res);
    });
  }, []);

  console.log('setFirm', firm);
  function handleChangeTab(value) {
    setTab(value);
    console.log('currentTabKey', currentTabKey);
  }
  if (!firm) {
    console.log("Загрузка")
    return (
      <div>Загрузка</div>
    )
  }
  return (
    <div>
      <Header>Настройки</Header>
      <SettingsTabs currentTabKey={currentTabKey} handleChangeTab={handleChangeTab} />
      {Number(currentTabKey) === 1 ? <Common firm={firm} setFirm={setFirm}/> : null }
      {Number(currentTabKey) === 2 ? <Staff /> : null }
      {Number(currentTabKey) === 3 ? <Contractors /> : null }
    </div>
  );
};

export default Settings;
