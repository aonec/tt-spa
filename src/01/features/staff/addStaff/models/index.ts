import {
  ManagingFirmUserCreateRequest,
  ManagingFirmUserResponse,
} from './../../../../../myApi';
import { createForm } from 'effector-forms';
import { createStore, createEvent, createEffect } from 'effector';
import { AnyFieldsConfigs, FormConfig } from 'effector-forms/dist/types';

export const $isAddStaffModalVisible = createStore(false);
export const $isAddStaffFailed = createStore(false);

export const addStaffButtonClicked = createEvent();
export const addStaffModalCloseButtonClicked = createEvent();
export const addStaffModalButtonClicked = createEvent();

const requiredValidation = {
  name: 'required',
  validator: (value: string) => Boolean(value),
};

const standartStringFieldInit = {
  init: '',
  rules: [requiredValidation],
};

export const staffFormConfig: FormConfig<AnyFieldsConfigs> = {
  fields: {
    email: {
      init: '',
      rules: [
        requiredValidation,
        {
          name: 'email',
          validator: (value: string) => /\S+@\S+\.\S+/.test(value),
        },
      ],
    },
    firstName: standartStringFieldInit,
    lastName: standartStringFieldInit,
    middleName: standartStringFieldInit,
    cellPhone: {
      init: '',
      rules: [
        requiredValidation,
        {
          name: 'phone',
          validator: (value: string) => value.length === 10,
        },
      ],
    },
    userRoleIds: {
      init: [] as number[],
      rules: [
        {
          name: 'required',
          validator: (value: string) => value.length > 0,
        },
      ],
    },
    firmCompetenceIds: {
      init: [] as string[],
    },
  },
  validateOn: ['submit'],
};

export const addStaffForm = createForm(staffFormConfig);

export const addStaffFx = createEffect<
  ManagingFirmUserCreateRequest,
  ManagingFirmUserResponse
>();
