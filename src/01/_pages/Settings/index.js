import React, { createContext, useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { EditButtonWrap, Header } from '../../tt-components';
import SettingsTabs from './components/SettingsTabs';
import Common from './components/Common';
import Staff from './components/Staff';
import Contractors from './components/Contractors';
import { getCurrentManagingFirm, getManagingFirmUsers, getContractors } from './apiSettings';
import { Icon } from '../../_components/Icon';
import ModalAddStaff from './components/Modals/ModalAddStaff'
import ModalAddContractor from './components/Modals/ModalAddContractor'

export const SettingsContext = createContext();
export const Settings = () => {
  console.log(useHistory())
  const { push, location } = useHistory();
  const [currentTabKey, setTab] = useState('1');
  const [firm, setFirm] = useState();
  const [users, setUsers] = useState();
  const [contractors, setContractors] = useState();

  const [staff, setStaff] = useState(false);
  const [contractor, setContractor] = useState(false);

  function showStaff(){
    setStaff(true)
  }

  function hideStaff(){
    setStaff(false)
  }

  function showContractor(){
    setContractor(true)
  }

  function hideContractor(){
    setContractor(false)
  }



  useEffect(() => {
    getCurrentManagingFirm().then((res) => {
      setFirm(res);
    });
    getManagingFirmUsers().then((res) => {
      setUsers(res);
    });
    getContractors().then((res) => {
      setContractors(res);
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

    if (currentTabKey === '1') {
      return null;
    }

    if (currentTabKey === '2') {
      return (
        <EditButtonWrap size="48" onClick={showStaff}>
          <Icon icon="plus" />
        </EditButtonWrap>
      );
    }
    if (currentTabKey === '3') {
      return (
        <EditButtonWrap size="48" onClick={showContractor}>
          <Icon icon="plus" />
        </EditButtonWrap>
      );
    }
  };

  const context = {users, firm, staff, contractor, showStaff, hideStaff, showContractor, hideContractor, contractors}

  return (
    <SettingsContext.Provider value={context} >
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Header>Настройки</Header>
        <HeaderButton />
      </div>
      <SettingsTabs currentTabKey={currentTabKey} handleChangeTab={handleChangeTab} />
      <Route path="/settings" exact><Common /></Route>
      <Route path="/settings/staff" exact><Staff /></Route>
      <Route path="/settings/contractors" exact><Contractors /></Route>
      <ModalAddStaff />
      <ModalAddContractor/>
    </div>
  </SettingsContext.Provider>
  );
};

export default Settings;
