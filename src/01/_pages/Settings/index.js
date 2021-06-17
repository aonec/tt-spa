import React, { createContext, useEffect, useState } from 'react';
import { Route, useHistory, useParams } from 'react-router-dom';
import { Header, MenuButtonTT } from '../../tt-components';
import SettingsTabs from './components/SettingsTabs';
import Staff from './components/Staff';
import Contractors from './components/Contractors';
import { getCurrentManagingFirm } from './apiSettings';
import ModalAddStaff from './components/Modals/ModalAddStaff';
import ModalAddContractor from './components/Modals/ModalAddContractor';
import { Loader } from '../../_components/Loader';
import CompanyInfo from './components/CompanyInfo';
import { addContractorsButtonMenuClicked } from '01/features/contractors/addContractors/models';
import { AddContractorsFormModal } from '01/features/contractors/addContractors';
import { addStaffButtonClicked } from '01/features/staff/addStaff/models';
import { EditManagingFirmUserPage } from '01/features/staff/managingFirmUser/editManagingFirmUser';

export const SettingsContext = createContext();
export const Settings = () => {
  const { push, location } = useHistory();
  const params = useParams();
  const section = params.section;
  const [currentTabKey, setTab] = useState('1');
  const [firm, setFirm] = useState();
  const [users, setUsers] = useState();
  const [staff, setStaff] = useState(false);
  const [contractor, setContractor] = useState(false);

  useEffect(() => {
    getCurrentManagingFirm().then((res) => {
      setFirm(res);
    });
    setCurrentTabFromLink(location);
  }, []);

  function showStaff() {
    setStaff(true);
  }

  function hideStaff() {
    setStaff(false);
  }

  function showContractor() {
    setContractor(true);
  }

  function hideContractor() {
    setContractor(false);
  }

  function setCurrentTabFromLink(location) {
    const { pathname } = location;
    switch (pathname) {
      case '/settings':
        setTab('1');
        break;
      case '/settings/staff':
        setTab('2');
        break;
      case '/settings/contractors':
        setTab('3');
        break;
      default:
        setTab('1');
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

  if (!firm) {
    console.log('Загрузка');
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <Loader show size={64} />
      </div>
    );
  }

  const context = {
    currentTabKey,
    users,
    firm,
    staff,
    contractor,
    showStaff,
    hideStaff,
    showContractor,
    hideContractor,
  };

  const needShowByRoute = (route) => {
    return section ? route === section : false;
  };

  const addContractorButton = {
    title: 'Добавить контрагента',
    cb: addContractorsButtonMenuClicked,
    show: needShowByRoute('contractors'),
    color: 'default',
    clickable: true,
  };

  const addStaffButton = {
    title: 'Добавить сотрудника',
    cb: addStaffButtonClicked,
    show: needShowByRoute('staff'),
    color: 'default',
    clickable: true,
  };

  const menuButtonArr = [addContractorButton, addStaffButton];

  if (needShowByRoute('editManagingFirmUser'))
    return <EditManagingFirmUserPage />;

  return (
    <SettingsContext.Provider value={context}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Header>Профиль компании</Header>
          <MenuButtonTT menuButtonArr={menuButtonArr} />
          <AddContractorsFormModal />
        </div>
        <SettingsTabs
          currentTabKey={currentTabKey}
          handleChangeTab={handleChangeTab}
        />
        <Route path="/settings" exact>
          <CompanyInfo />
        </Route>
        <Route path="/settings/staff" exact>
          <Staff />
        </Route>
        <Route path="/settings/contractors" exact>
          <Contractors />
        </Route>
        <ModalAddStaff />
        <ModalAddContractor />
      </div>
    </SettingsContext.Provider>
  );
};

export default Settings;
