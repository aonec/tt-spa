import { Empty } from 'antd';
import React, { FC } from 'react';
import { GoBack } from 'ui-kit/sharedComponents/GoBack';
import { EditCompanyForm } from '../EditCompanyForm';
import { PageHeaderSC } from './EditCompanyPage.styled';
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
          <PageHeaderSC title="Профиль компании. Редактирование" />
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
