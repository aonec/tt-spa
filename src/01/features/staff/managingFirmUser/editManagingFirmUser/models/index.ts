import { createGate } from 'effector-react';
import { staffFormConfig } from '01/features/staff/addStaff/models';
import { createEvent, createEffect } from 'effector';
import { createForm } from 'effector-forms';
import { ManagingFirmUserResponse, ManagingFirmUserUpdateRequest } from 'myApi';

export const editManagingUserInfoForm = createForm(staffFormConfig);

export const saveManagingUserInfoButtonClicked = createEvent<number>();

export const editManagingUserInfoFx = createEffect<
  { id: number } & ManagingFirmUserUpdateRequest,
  ManagingFirmUserResponse
>();
