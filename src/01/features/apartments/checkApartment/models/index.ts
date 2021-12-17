import {
  CreateApartmentCheckRequest,
  ECheckType,
} from './../../../../../myApi';
import { createForm } from 'effector-forms';
import { createStore, createEffect, createEvent } from 'effector';
import { FileData } from '01/hooks/useFilesUpload';

export const $isCheckApartmentModalOpen = createStore(false);

export const checkApartmentFx = createEffect<
  {
    apartmentId: number;
    data: CreateApartmentCheckRequest;
  },
  void
>();

export const closeCheckApartmentModal = createEvent();
export const openCheckApartmentModal = createEvent();

export const checkApartmentForm = createForm({
  fields: {
    checkingDate: {
      init: null as null | string,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    checkType: {
      init: null as null | ECheckType,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    documentIds: {
      init: [] as FileData[],
      rules: [
        {
          name: 'required',
          validator: (arr) => Boolean(arr.length),
        },
      ],
    },
    registryNumber: {
      init: '',
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
  },
});
