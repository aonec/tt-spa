import React, { createContext, useEffect, useState } from 'react';
import { Route, useHistory, useParams } from 'react-router-dom';
import { Header, MenuButtonTT } from '../../tt-components';
import SettingsTabs from './components/SettingsTabs';
import Staff from './components/Staff';
import Contractors from './components/Contractors';
import ModalAddStaff from './components/Modals/ModalAddStaff';
import ModalAddContractor from './components/Modals/ModalAddContractor';
import { Loader } from '../../_components/Loader';
import CompanyInfo from './components/CompanyInfo';
import { addContractorsButtonMenuClicked } from '01/features/contractors/addContractors/models';
import { AddContractorsFormModal } from '01/features/contractors/addContractors';
import { addStaffButtonClicked } from '01/features/staff/addStaff/models';
import { getCurrentManagingFirm } from './apiSettings';

export const SettingsContext = createContext();
export const Settings = () => {
  const history = useHistory();
  const { push } = history;
  const params = useParams();
  const section = params.section;
  const [firm, setFirm] = useState();
  const [users, setUsers] = useState();
  const [staff, setStaff] = useState(false);
  const [contractor, setContractor] = useState(false);

  useEffect(() => {
    getCurrentManagingFirm().then((res) => {
      setFirm(res);
    });
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

  function getCurrentTabFromLink() {
    const { location } = history;
    switch (location.pathname) {
      case '/companyProfile':
        return '1';
      case '/companyProfile/staff':
        return '2';
      case '/companyProfile/contractors':
        return '3';
      default:
        return '1';
    }
  }

  function handleChangeTab(value) {
    switch (value) {
      case '1':
        push('/companyProfile');
        break;
      case '2':
        push('/companyProfile/staff');
        break;
      case '3':
        push('/companyProfile/contractors');
        break;
      default:
        push('/companyProfile');
    }
  }

  if (!firm) {
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
    users,
    firm,
    staff,
    contractor,
    showStaff,
    hideStaff,
    showContractor,
    hideContractor,
  };

  const needShowByRoute = (route) => route === section;

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

  return (
    <SettingsContext.Provider value={context}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Header>Профиль компании</Header>
          <MenuButtonTT menuButtonArr={menuButtonArr} />
          <AddContractorsFormModal />
        </div>
        <SettingsTabs
          currentTabKey={getCurrentTabFromLink()}
          handleChangeTab={handleChangeTab}
        />
        <Route path="/companyProfile" exact>
          <CompanyInfo />
        </Route>
        <Route path="/companyProfile/staff" exact>
          <Staff />
        </Route>
        <Route path="/companyProfile/contractors" exact>
          <Contractors />
        </Route>
        <ModalAddStaff />
        <ModalAddContractor />
      </div>
    </SettingsContext.Provider>
  );
};

export default Settings;
