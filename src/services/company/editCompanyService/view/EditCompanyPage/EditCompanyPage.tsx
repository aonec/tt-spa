import { Empty } from 'antd';
import React, { FC } from 'react';
import { GoBack } from 'ui-kit/shared/GoBack';
import { EditCompanyForm } from '../EditCompanyForm';
import { PageHeaderSC } from './EditCompanyPage.styled';
import { EditCompanyPageProps } from './EditCompanyPage.types';

export const EditCompanyPage: FC<EditCompanyPageProps> = ({
  currentManagingFirm,
  existingCities,
  isUpdating,
  form,
}) => {
  return (
    <>
      <GoBack />
      {currentManagingFirm && (
        <>
          <PageHeaderSC title="Профиль компании. Редактирование" />
          <EditCompanyForm
            existingCities={existingCities}
            isUpdating={isUpdating}
            form={form}
          />
        </>
      )}
      {!currentManagingFirm && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных" />
      )}
    </>
  );
};
