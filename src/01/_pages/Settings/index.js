import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { EditButtonWrap, Header } from '../../tt-components';
import SettingsTabs from './components/SettingsTabs';
import Common from './components/Common';
import Staff from './components/Staff';
import Contractors from './components/Contractors';
import { getCurrentManagingFirm, getManagingFirmUsers } from './apiSettings';
import { Icon } from '../../_components/Icon';

export const Settings = (props) => {
  console.log('Settings');
  console.log(props);
  const { push, location } = useHistory();
  const { pathname } = location;
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

  console.log('setFirm', firm);
  function handleChangeTab(value) {
    console.log('currentTabKey', currentTabKey);

    setTab(value);
    if (value == '1') {
      push('/settings');
    }
    if (value == '2') {
      push('/settings/staff');
    }
    if (value == '3') {
      push('/settings/contractors');
    }
  }
  if (!firm || !users) {
    console.log('Загрузка');
    return (
      <div>Загрузка</div>
    );
  }

  const HeaderButton = () => {
    console.log('HeaderButton');

    const handleContractors = () => {
      console.log('handleContractors');
    };
    const handleStaff = () => {
      console.log('handleStaff');
    };

    if (currentTabKey == 1) {
      return null;
    }
    if (currentTabKey == 2) {
      return (
        <EditButtonWrap size="48" onClick={handleStaff}>
          <Icon icon="plus" />
        </EditButtonWrap>
      );
    }
    if (currentTabKey == 3) {
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
      <Route exact path="/settings">
        {' '}
        <Common firm={firm} setFirm={setFirm} />
      </Route>
      <Route exact path="/settings/staff">
        {' '}
        <Staff users={users} setUsers={setUsers} />
      </Route>
      <Route exact path="/settings/contractors">
        {' '}
        <Contractors />
      </Route>
    </div>
  );
};

export default Settings;
