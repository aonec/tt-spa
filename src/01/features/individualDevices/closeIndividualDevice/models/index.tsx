import { createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms/dist';

export const $closingIndividualDeviceId = createStore<number | null>(null);
export const $isCloseIndividualDeviceModalOpen = $closingIndividualDeviceId.map(
  Boolean
);

export const closeIndividualDeviceForm = createForm({
  fields: {
    documentIds: {
      init: [] as number[],
    },
    clousingDate: {
      init: null as null | string,
      rules: [{ name: 'required', validator: Boolean }],
    },
  },
});

export const closingIndividualDeviceButtonClicked = createEvent();
export const closingIndividualDeviceModalButtonClicked = createEvent();
export const clouseClousingIndividualDeviceModalButtonClicked = createEvent();
