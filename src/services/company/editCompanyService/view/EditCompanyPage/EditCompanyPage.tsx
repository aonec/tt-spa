import { PageHeader } from '01/shared/ui/PageHeader';
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
      <HeaderWrapper>
        <PageHeader title="Профиль компании. Редактирование" />
      </HeaderWrapper>
      {currentManagingFirm && (
        <EditCompanyForm
          currentManagingFirm={currentManagingFirm}
          handleUpdateOrganization={handleUpdateOrganization}
          existingCities={existingCities}
          isUpdating={isUpdating}
        />
      )}
    </>
  );
};
