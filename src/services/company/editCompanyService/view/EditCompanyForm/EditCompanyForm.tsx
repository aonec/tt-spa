import { useFormik } from 'formik';
import { OrganizationUpdateRequest } from 'myApi';
import React, { FC } from 'react';
import { Wrapper } from './EditCompanyForm.styled';
import { EditCompanyFormProps } from './EditCompanyForm.types';

export const EditCompanyForm: FC<EditCompanyFormProps> = ({
  currentManagingFirm,
  handleUpdateOrganization,
}) => {
  useFormik<OrganizationUpdateRequest>({
    initialValues: {
      city: currentManagingFirm.address?.city || null,
      corpus: currentManagingFirm.address?.corpus || null,
      street: currentManagingFirm.address?.street || null,
      houseNumber: currentManagingFirm.address?.houseNumber || null,
      email: currentManagingFirm.email,
      name: currentManagingFirm.name,
      phoneNumber: currentManagingFirm.phoneNumber,
    },
    onSubmit: handleUpdateOrganization,
  });

  return <Wrapper></Wrapper>;
};
