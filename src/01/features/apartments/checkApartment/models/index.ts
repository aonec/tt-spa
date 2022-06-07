import {
  CreateApartmentCheckRequest,
  EActResourceType,
  ECheckType,
} from './../../../../../myApi';
import { createForm } from 'effector-forms';
import { createStore, createEffect, createEvent } from 'effector';
import { FileData } from '01/hooks/useFilesUpload';
import { CheckApartmentPayload, RemoveCheckPayload } from '01/_api/apartments';
import { EffectFailDataAxiosError } from 'types';

export const $isCheckApartmentModalOpen = createStore(false);

export const checkApartmentFx = createEffect<
  {
    apartmentId: number;
    data: CreateApartmentCheckRequest;
  },
  void,
  EffectFailDataAxiosError
>();

export const createApartmentCheckEv = createEvent();

export const closeCheckApartmentModal = createEvent();
export const openCheckApartmentModal = createEvent();

export const removeApartmnetCheckFx = createEffect<RemoveCheckPayload, void>();

export const removeApartmentCheckEv = createEvent<number>();

export const openEditCheckModal = createEvent();

export interface EditApartmentCheckPayload {
  id: number;
  checkingDate: string;
  checkType: ECheckType;
  checkingAct: any;
  registryNumber: string;
  actResourceType: EActResourceType;
}

export const $editApartmentCheckModalPayload = createStore<EditApartmentCheckPayload | null>(
  null
);
export const $isEditApartmentCheckModalOpen = $editApartmentCheckModalPayload.map(
  Boolean
);

export const openEditApartmentCheckModal = createEvent<EditApartmentCheckPayload>();

export const editApartmentCheckFx = createEffect<CheckApartmentPayload, void>();

export const clearPayloadFile = createEvent();

export const saveEditApartmentCheck = createEvent();

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
          validator: (files) => {
            const isEditMode = $isEditApartmentCheckModalOpen.getState();

            return isEditMode || files.length > 0;
          },
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
    checkingAct: {
      init: null as null | null,
    },
    actResourceType: {
      init: null as null | EActResourceType,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
  },
});
