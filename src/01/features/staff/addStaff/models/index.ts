import {
  ManagingFirmUserCreateRequest,
  ManagingFirmUserResponse,
} from './../../../../../myApi';
import { createForm } from 'effector-forms';
import { createStore, createEvent, createEffect } from 'effector';

export const isAddStaffModalVisible = createStore(false);

export const addStaffButtonClicked = createEvent();
export const addStaffModalCloseButtonClicked = createEvent();
export const addStaffModalButtonClicked = createEvent();

const requireValidation = {
  name: 'required',
  validator: (value: string) => Boolean(value),
};

const standartStringFieldInit = {
  init: '',
  validator: [requireValidation],
};

export const addStaffForm = createForm({
  fields: {
    email: {
      init: '',
      validator: (value: string) => /\S+@\S+\.\S+/.test(value),
    },
    firstName: standartStringFieldInit,
    lastName: standartStringFieldInit,
    middleName: standartStringFieldInit,
    cellPhone: standartStringFieldInit,
    userRoleIds: {
      init: [] as number[],
    },
    firmCompetenceIds: {
      init: [] as string[],
    },
  },
  validateOn: ['submit'],
});

export const addStaffFx = createEffect<
  ManagingFirmUserCreateRequest,
  ManagingFirmUserResponse
>();
