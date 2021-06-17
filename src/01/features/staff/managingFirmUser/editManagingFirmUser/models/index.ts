import { staffFormConfig } from '01/features/staff/addStaff/models';
import { createEvent, createEffect } from 'effector';
import { createForm } from 'effector-forms';

export const editManagingUserInfoForm = createForm(staffFormConfig);

export const saveManagingUserInfoButtonClicked = createEvent<number>();
export const managingUserInfoCancelButtonClicked = createEvent();

export const editManagingUserInfoFx = createEffect();
