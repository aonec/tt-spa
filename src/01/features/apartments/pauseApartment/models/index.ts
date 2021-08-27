import { FileData } from './../../../../hooks/useFilesUpload';
import { SetApartmentStatusRequest } from './../../../../_api/apartments';
import { IndividualDeviceWithExpiredCheckingDateListResponse } from './../../../../../myApi';
import { createForm } from 'effector-forms';
import { createStore, createEffect, createEvent, fromObservable } from 'effector';
import moment from 'moment';

export const $isPauseApartmentModalVisible = createStore(false);

export const pauseApartmentForm = createForm({
  fields: {
    fromDate: {
      init: moment().toISOString() as string | null,
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
    documents: {
      init: [] as FileData[],
    },
  },
});

export const pauseApartmentButtonClicked = createEvent();
export const pauseApartmentModalCancelButtonClicked = createEvent();
export const cancelPauseApartmentButtonClicked = createEvent();

export const pauseApartmentStatusFx = createEffect<
  SetApartmentStatusRequest,
  IndividualDeviceWithExpiredCheckingDateListResponse
>();
