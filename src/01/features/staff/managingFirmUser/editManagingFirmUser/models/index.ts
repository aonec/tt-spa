import { reduceBooleanArr } from './utils';
import {
  $isFetchingManagingFirmUserFailed,
  fetchManagingFirmUserFx,
} from './../../displayManagingFirmUser/models/index';
import {
  $isFetchingUserRolesFailed,
  fetchUserRolesFx,
} from './../../../../userRoles/displayUserRoles/models/index';
import {
  $isFetchingCompetencesFailed,
  fetchCompetencesFx,
} from './../../../../competences/fetchCompetences/models/index';
import { createGate } from 'effector-react';
import { staffFormConfig } from '01/features/staff/addStaff/models';
import { createEvent, createEffect, createStore, combine } from 'effector';
import { createForm } from 'effector-forms';
import { ManagingFirmUserResponse, ManagingFirmUserUpdateRequest } from 'myApi';

export const editManagingUserInfoForm = createForm(staffFormConfig);

export const $isUpdateManagingFirmUserSuccess = createStore<null | boolean>(
  null,
);
export const $isEditingManagingFirmUserInfoRequestFailed = createStore(false);
export const resetEditManagingUserRequest = createEvent();
export const saveManagingUserInfoButtonClicked = createEvent<number>();

export const editManagingUserInfoFx = createEffect<
  { id: number } & ManagingFirmUserUpdateRequest,
  ManagingFirmUserResponse
>();

export const EditManagingFirmUserGate = createGate();

export const $isFormDataLoading = combine(
  fetchCompetencesFx.pending,
  fetchUserRolesFx.pending,
  fetchManagingFirmUserFx.pending,
  reduceBooleanArr,
);

export const $isFetchingFormDataFailed = combine(
  $isFetchingCompetencesFailed,
  $isFetchingUserRolesFailed,
  $isFetchingManagingFirmUserFailed,
  reduceBooleanArr,
);
