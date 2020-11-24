import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { EditButtonWrap, Header } from '../../tt-components';
import SettingsTabs from './components/SettingsTabs';
import Common from './components/Common';
import Staff from './components/Staff';
import Contractors from './components/Contractors';
import { getCurrentManagingFirm, getManagingFirmUsers } from './apiSettings';
import { Icon } from '../../_components/Icon';
import ModalAddStaff from './components/Modals/ModalAddStaff'
import ModalAddContractor from './components/Modals/ModalAddContractor'

export const Settings = () => {
  console.log(useHistory())
  const { push, location } = useHistory();
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
    setCurrentTabFromLink(location);
  }, []);

  function setCurrentTabFromLink(location){
    const {pathname} = location;
    switch (pathname) {
      case '/settings':
        setTab('1')
        break;
      case '/settings/staff':
        setTab('2')
        break;
      case '/settings/contractors':
        setTab('3')
        break;
      default:
        setTab('1')
    }

  }

  function handleChangeTab(value) {
    setTab(value);
    switch (value) {
      case '1':
        push('/settings');
        break;
      case '2':
        push('/settings/staff');
        break;
      case '3':
        push('/settings/contractors');
        break;
      default:
        push('/settings');
    }
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
      <Route path="/settings" exact><Common firm={firm} setFirm={setFirm} /></Route>
      <Route path="/settings/staff" exact><Staff users={users} setUsers={setUsers} /></Route>
      <Route path="/settings/contractors" exact><Contractors /></Route>
      <ModalAddStaff />
      <ModalAddContractor />
    </div>
  );
};

export default Settings;
