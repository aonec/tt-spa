import { createGate } from 'effector-react';
import { staffFormConfig } from '01/features/staff/addStaff/models';
import { createEffect } from 'effector';
import { createForm } from 'effector-forms';
import { OrganizationUserResponse, OrganizationUserUpdateRequest } from 'myApi';

export const editManagingUserInfoForm = createForm(staffFormConfig);

export const editManagingUserInfoFx = createEffect<
  { id: number } & OrganizationUserUpdateRequest,
  OrganizationUserResponse
>();

export const EditManagingFirmUserGate = createGate();
