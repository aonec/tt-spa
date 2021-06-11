import { EManagingFirmUserWorkingStatusTypeStringDictionaryItem } from './../../../../../../myApi';
import { createForm } from 'effector-forms';
import { createEffect, createStore, createEvent } from 'effector';

export const $editStaffStatusUserId = createStore<number | null>(null);
export const $isEditStaffStatusRequestFailed = createStore(false);
export const $isEditStaffStatusModalVisible = $editStaffStatusUserId.map(
  (id) => id !== null
);

const dateField = {
  init: null as string | null,
  rules: [
    {
      name: 'required',
      validator: (value: string) => value !== null,
    },
  ],
};

export const editStaffStatusForm = createForm({
  fields: {
    type: {
      init: null as EManagingFirmUserWorkingStatusTypeStringDictionaryItem | null,
      rules: [
        {
          name: 'required',
          validator: (value) => value !== null,
        },
      ],
    },
    startDate: dateField,
    endDate: dateField,
  },
});

export const editStaffStatusButtonClicked = createEvent<number>();
export const editStaffStatusCancelButtonClicked = createEvent();
export const editStaffStatusConfirmButtonClicked = createEvent();

export const updateStaffStatusFx = createEffect();
