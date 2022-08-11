import {
  AddOrganizationUserWorkingStatusRequest,
  EOrganizationUserWorkingStatusType,
  ManagingFirmUserResponse,
  OrganizationUserWorkingStatusResponseSuccessApiResponse,
} from 'myApi';
import { createForm } from 'effector-forms';
import { createEffect, createStore, createEvent } from 'effector';

export const $editStaffStatusUserId = createStore<number | null>(null);
export const $isEditStaffStatusRequestFailed = createStore(false);
export const $isEditStaffStatusModalVisible = $editStaffStatusUserId.map(
  (id) => id !== null
);

const isNotNull = (value: any) => value !== null;

export const editStaffStatusForm = createForm({
  fields: {
    type: {
      init: null as EOrganizationUserWorkingStatusType | null,
      rules: [
        {
          name: 'required',
          validator: isNotNull,
        },
      ],
    },
    startDate: {
      init: null as string | null,
      rules: [
        {
          name: 'required',
          validator: isNotNull,
        },
      ],
    },
    endDate: {
      init: null as string | null,
      rules: [
        {
          name: 'required',
          validator: isNotNull,
        },
      ],
    },
  },
});

export const editStaffStatusButtonClicked = createEvent<ManagingFirmUserResponse>();
export const editStaffStatusCancelButtonClicked = createEvent();
export const editStaffStatusConfirmButtonClicked = createEvent();

export const editStaffStatusFx = createEffect<
  AddOrganizationUserWorkingStatusRequest,
  OrganizationUserWorkingStatusResponseSuccessApiResponse
>();
