import React, { useEffect, useState } from 'react';
import { EditButtonWrap, Header } from '../../tt-components';
import SettingsTabs from './components/SettingsTabs';
import Common from './components/Common';
import Staff from './components/Staff';
import Contractors from './components/Contractors';
import { getCurrentManagingFirm, getManagingFirmUsers } from './apiSettings';
import { Icon } from '../../_components/Icon';

export const Settings = () => {

  const [currentTabKey, setTab] = useState('1');
  const [firm, setFirm] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    getCurrentManagingFirm().then((res) => {
      setFirm(res);
    });
    getManagingFirmUsers().then((res) => {
      setUsers(res);
    });
  }, []);


  function handleChangeTab(value) {
    setTab(value);
  }

  if (!firm || !users) {
    console.log('Загрузка');
    return (
      <div>Загрузка</div>
    );
  }

  const HeaderButton = () => {

    const handleContractors = () => {
      console.log('handleContractors');
    };
    const handleStaff = () => {
      console.log('handleStaff');
    };

    if (currentTabKey === '1') {
      return null;
    }

    if (currentTabKey === '2') {
      return (
        <EditButtonWrap size="48" onClick={handleStaff}>
          <Icon icon="plus" />
        </EditButtonWrap>
      );
    }
    if (currentTabKey === '3') {
      return (
        <EditButtonWrap size="48" onClick={handleContractors}>
          <Icon icon="plus" />
        </EditButtonWrap>
      );
    }
  };

  console.log('users', users);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Header>Настройки</Header>
        <HeaderButton />
      </div>

      <SettingsTabs currentTabKey={currentTabKey} handleChangeTab={handleChangeTab} />
      {/*{Number(currentTabKey) === 1 ? <Common firm={firm} setFirm={setFirm} /> : null }*/}
      {/*{Number(currentTabKey) === 2 ? <Staff users={users} setUsers={setUsers} /> : null }*/}
      {/*{Number(currentTabKey) === 3 ? <Contractors /> : null }*/}
    </div>
  );
};

export default Settings;
