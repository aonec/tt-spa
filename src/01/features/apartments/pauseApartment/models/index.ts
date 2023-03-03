import { createForm } from 'effector-forms';
import { createStore, createEffect, createEvent } from 'effector';
import moment from 'moment';
import { createGate } from 'effector-react';
import { IndividualDeviceWithExpiredCheckingDateListResponse } from 'myApi';
import { SetApartmentStatusRequest } from './../../../../_api/apartments.types';
import { EffectFailDataAxiosError } from 'types';
import { Document } from 'ui-kit/DocumentsService';

export const $isPauseApartmentModalVisible = createStore(false);

export const PauseApartmentGate = createGate<{ id: number }>();

export const pauseApartmentForm = createForm({
  fields: {
    fromDate: {
      init: moment().toISOString(true) as string | null,
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
      init: [] as Document[],
    },
  },
});

export const pauseApartmentButtonClicked = createEvent();
export const pauseApartmentModalCancelButtonClicked = createEvent();
export const cancelPauseApartmentButtonClicked = createEvent();

export const pauseApartmentStatusFx = createEffect<
  SetApartmentStatusRequest,
  IndividualDeviceWithExpiredCheckingDateListResponse,
  EffectFailDataAxiosError
>();
