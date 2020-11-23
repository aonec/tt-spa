import React, { useEffect, useState } from 'react';
import { Header } from '../../tt-components';
import SettingsTabs from './components/SettingsTabs';
import Common from './components/Common';
import Staff from './components/Staff';
import Contractors from './components/Contractors';
import { getCurrentManagingFirm, getManagingFirmUsers } from './apiSettings';

export const Settings = () => {
  console.log('Settings');
  const [currentTabKey, setTab] = useState('1');
  const [firm, setFirm] = useState()
  const [users, setUsers] = useState()

  useEffect(() => {
    getCurrentManagingFirm().then((res) => {
      setFirm(res);
    });
    getManagingFirmUsers().then((res) => {
      setUsers(res);
    });


  }, []);

  console.log('setFirm', firm);
  function handleChangeTab(value) {
    setTab(value);
    console.log('currentTabKey', currentTabKey);
  }
  if (!firm || !users) {
    console.log("Загрузка")
    return (
      <div>Загрузка</div>
    )
  }

  console.log("users", users)
  return (
    <div>
      <Header>Настройки</Header>
      <SettingsTabs currentTabKey={currentTabKey} handleChangeTab={handleChangeTab} />
      {Number(currentTabKey) === 1 ? <Common firm={firm} setFirm={setFirm}/> : null }
      {Number(currentTabKey) === 2 ? <Staff users={users} setUsers={setUsers} /> : null }
      {Number(currentTabKey) === 3 ? <Contractors /> : null }
    </div>
  );
};

export default Settings;
