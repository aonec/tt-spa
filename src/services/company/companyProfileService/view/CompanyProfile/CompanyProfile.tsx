import React, { FC, useMemo } from 'react';
import {
  CompanyProfileProps,
  CompanyProfileSection,
} from './CompanyProfile.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import { Route, useHistory, useParams } from 'react-router-dom';
import { CommonInfoTab } from './Tabs/CommonInfoTab';
import { Staff } from './Tabs/Staff';
import { Contractors } from './Tabs/Contractors';
import { TabsSC } from './CompanyProfile.styled';

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

  const tabItems = useMemo(
    () => [
      { label: 'Общие данные', key: CompanyProfileSection.CommonInfo },
      { label: 'Сотрудники', key: CompanyProfileSection.Staff },
      { label: 'Контрагенты', key: CompanyProfileSection.Contractors },
    ],
    [],
  );

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
      <TabsSC
        activeKey={section}
        onChange={(activeKey) =>
          history.push(`/companyProfile/${activeKey as CompanyProfileSection}`)
        }
        items={tabItems}
      />

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
