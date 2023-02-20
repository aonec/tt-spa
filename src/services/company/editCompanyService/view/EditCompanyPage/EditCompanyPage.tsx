import { PageHeader } from '01/shared/ui/PageHeader';
import { Empty } from 'antd';
import React, { FC } from 'react';
import { GoBack } from 'ui-kit/shared_components/GoBack';
import { EditCompanyForm } from '../EditCompanyForm';
import { HeaderWrapper } from './EditCompanyPage.styled';
import { EditCompanyPageProps } from './EditCompanyPage.types';

export const EditCompanyPage: FC<EditCompanyPageProps> = ({
  currentManagingFirm,
  handleUpdateOrganization,
  existingCities,
  isUpdating,
}) => {
  return (
    <>
      <GoBack />
      {currentManagingFirm && (
        <>
          <HeaderWrapper>
            <PageHeader title="Профиль компании. Редактирование" />
          </HeaderWrapper>
          <EditCompanyForm
            currentManagingFirm={currentManagingFirm}
            handleUpdateOrganization={handleUpdateOrganization}
            existingCities={existingCities}
            isUpdating={isUpdating}
          />
        </>
      )}
      {!currentManagingFirm && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных" />
      )}
    </>
  );
};
