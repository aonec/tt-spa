import {
  EManagingFirmUserWorkingStatusType,
  ManagingFirmUserResponse,
} from './../../../../../../myApi';
import { createForm } from 'effector-forms';
import { createEffect, createStore, createEvent } from 'effector';

export const $editStaffStatusUserId = createStore<number | null>(null);
export const $isEditStaffStatusRequestFailed = createStore(false);
export const $isEditStaffStatusModalVisible = $editStaffStatusUserId.map(
  (id) => id !== null
);

export const editStaffStatusForm = createForm({
  fields: {
    type: {
      init: null as EManagingFirmUserWorkingStatusType | null,
      rules: [
        {
          name: 'required',
          validator: (value) => value !== null,
        },
      ],
    },
    startDate: {
      init: null as string | null,
      rules: [
        {
          name: 'required',
          validator: (value) => value !== null,
        },
      ],
    },
    endDate: {
      init: null as string | null,
      rules: [
        {
          name: 'required',
          validator: (value) => value !== null,
        },
      ],
    },
  },
});

export const editStaffStatusButtonClicked = createEvent<ManagingFirmUserResponse>();
export const editStaffStatusCancelButtonClicked = createEvent();
export const editStaffStatusConfirmButtonClicked = createEvent();

export const editStaffStatusFx = createEffect();
