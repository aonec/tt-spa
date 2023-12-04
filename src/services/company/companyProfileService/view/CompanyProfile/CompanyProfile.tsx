import React, { FC, useMemo } from 'react';
import {
  CompanyProfileProps,
  CompanyProfileSection,
} from './CompanyProfile.types';
import { PageHeader } from 'ui-kit/shared/PageHeader';
import {
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { CommonInfoTab } from './Tabs/CommonInfoTab';
import { Staff } from './Tabs/Staff';
import { Contractors } from './Tabs/Contractors';
import { TabsSC } from './CompanyProfile.styled';
import { companyProfileService } from '../../companyProfileService.model';



export const CompanyProfile: FC<CompanyProfileProps> = ({
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
  const history = useNavigate();
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
              onClick: () => history('/editCompany'),
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
          history(`/companyProfile/${activeKey as CompanyProfileSection}`)
        }
        items={tabItems}
      />
    </>
  );
};
