import { FileData } from './../../../../hooks/useFilesUpload';
import { createEffect, createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms/dist';
import { CloseIndividualDeviceRequestBody } from '01/_api/individualDevices';

export const $closingIndividualDeviceId = createStore<number | null>(null);
export const $isCloseIndividualDeviceModalOpen = $closingIndividualDeviceId.map(
  Boolean
);

export const isClosingIndividualDeviceRequestFailed = createStore(false);
export const isClosingIndividualDeviceRequstSuccessfull = createStore<
  boolean | null
>(null);

export const closeIndividualDeviceForm = createForm({
  fields: {
    documentIds: {
      init: [] as FileData[],
    },
    clousingDate: {
      init: null as null | string,
      rules: [{ name: 'required', validator: Boolean }],
    },
  },
});

export const closingIndividualDeviceButtonClicked = createEvent<number>();
export const closeClosingIndividualDeviceModalButtonClicked = createEvent();

export const closeIndividualDeviceFx = createEffect<
  CloseIndividualDeviceRequestBody,
  any
>();
