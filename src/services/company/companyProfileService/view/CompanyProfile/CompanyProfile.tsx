import React, { FC } from 'react';
import {
  CompanyProfileProps,
  CompanyProfileSection,
} from './CompanyProfile.types';
import { PageHeader } from '01/shared/ui/PageHeader';
import { Tabs } from 'ui-kit/Tabs';
import { Route, useHistory, useParams } from 'react-router-dom';
import { CommonInfoTab } from './Tabs/CommonInfoTab';
import { Staff } from './Tabs/Staff';
import { Contractors } from './Tabs/Contractors';

export const CompanyProfile: FC<CompanyProfileProps> = ({
  currentManagingFirm,
  staffList,
  isLoadingStaff,
  handleOpenStatusChangeModal,
  handleCatchEmployeeStatusData,
  handleOpenDeleteModal,
  handleCatchEmployeeId,
  handleOpenCreateEmployeeModal,
  conractorsList,
  isLoadingContractors,
  handleOpenAddContractorModal,
  catchContractorId,
  handleOpenEditContractorModal,
  catchContractorData,
}) => {
  const history = useHistory();
  const { section } = useParams<{ section: CompanyProfileSection }>();

  return (
    <>
      <PageHeader
        title="Профиль компании"
        contextMenu={{
          menuButtons: [
            {
              title: 'Редактировать информацию о компании',
              onClick: () => history.push('/editCompany'),
            },
            {
              title: 'Добавить контрагента',
              onClick: () => handleOpenAddContractorModal(),
              hidden:
                CompanyProfileSection.Staff === section ||
                CompanyProfileSection.CommonInfo === section,
            },
            {
              title: 'Добавить сотрудника',
              onClick: () => handleOpenCreateEmployeeModal(),
              hidden:
                CompanyProfileSection.Contractors === section ||
                CompanyProfileSection.CommonInfo === section,
            },
          ],
        }}
      />
      <Tabs
        activeKey={section}
        onChange={(activeKey) =>
          history.push(`/companyProfile/${activeKey as CompanyProfileSection}`)
        }
      >
        <Tabs.TabPane
          tab="Общие данные"
          key={CompanyProfileSection.CommonInfo}
        />
        <Tabs.TabPane tab="Сотрудники" key={CompanyProfileSection.Staff} />
        <Tabs.TabPane
          tab="Контрагенты"
          key={CompanyProfileSection.Contractors}
        />
      </Tabs>

      <Route path="/companyProfile/commonInfo" exact>
        <CommonInfoTab currentManagingFirm={currentManagingFirm} />
      </Route>
      <Route path="/companyProfile/staff" exact>
        <Staff
          staffList={staffList}
          isLoadingStaff={isLoadingStaff}
          handleOpenStatusChangeModal={handleOpenStatusChangeModal}
          handleCatchEmployeeStatusData={handleCatchEmployeeStatusData}
          handleOpenDeleteModal={handleOpenDeleteModal}
          handleCatchEmployeeId={handleCatchEmployeeId}
        />
      </Route>
      <Route path="/companyProfile/contractors" exact>
        <Contractors
          conractorsList={conractorsList}
          isLoadingContractors={isLoadingContractors}
          catchContractorId={catchContractorId}
          handleOpenEditContractorModal={handleOpenEditContractorModal}
          catchContractorData={catchContractorData}
        />
      </Route>
    </>
  );
};
