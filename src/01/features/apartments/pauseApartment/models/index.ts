import { SetApartmentStatusRequest } from './../../../../_api/apartments';
import { IndividualDeviceWithExpiredCheckingDateListResponse } from './../../../../../myApi';
import { createForm } from 'effector-forms';
import { createStore, createEffect, createEvent } from 'effector';

export const $isPauseApartmentModalVisible = createStore(false);

export const pauseApartmentForm = createForm({
  fields: {
    fromDate: {
      init: null as string | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    toDate: {
      init: null as string | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    documentId: {
      init: null as number | null,
    },
  },
});

export const pauseApartmentButtonClicked = createEvent();
export const pauseApartmentModalCancelButtonClicked = createEvent();

export const pauseApartmentStatusFx = createEffect<
  SetApartmentStatusRequest,
  IndividualDeviceWithExpiredCheckingDateListResponse
>();
