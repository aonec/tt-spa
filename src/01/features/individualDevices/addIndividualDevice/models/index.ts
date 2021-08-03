import { createEvent, createStore } from 'effector';
import { createForm } from 'effector-forms/dist';

export const $creationDeviceStage = createStore<0 | 1>(0);

export const $isOpenCheckCreationDeviceFormDataModal = createStore(false);

export const addIndividualDeviceForm = createForm({
  fields: {
    serialNumber: {
      init: '',
      rules: [{ name: 'required', validator: Boolean }],
    },
    lastCheckingDate: {
      init: null as string | null,
      rules: [{ name: 'required', validator: Boolean }],
    },
    futureCheckingDate: {
      init: null as string | null,
      rules: [{ name: 'required', validator: Boolean }],
    },
    lastCommercialAccountingDate: {
      init: null as string | null,
      rules: [{ name: 'required', validator: Boolean }],
    },
    documentsIds: {
      init: [] as number[],
    },
    bitDepth: {
      init: null as number | null,
      rules: [{ name: 'required', validator: Boolean }],
    },
    scaleFactor: {
      init: null as number | null,
      rules: [{ name: 'required', validator: Boolean }],
    },
    apartmentId: {
      init: null as number | null,
      rules: [{ name: 'required', validator: Boolean }],
    },
    mountPlaceId: {
      init: null as number | null,
      rules: [{ name: 'required', validator: Boolean }],
    },
    model: {
      init: '',
      rules: [{ name: 'required', validator: Boolean }],
    },
    rateType: {
      init: '',
      rules: [{ name: 'required', validator: Boolean }],
    },
    resource: {
      init: '',
      rules: [{ name: 'required', validator: Boolean }],
    },
    magneticSealInstallationDate: {
      init: null as null | string,
    },
    magneticSealTypeName: {
      init: null as null | string,
    },
    isInstalled: {
      init: false,
    },
  },
});

export const switchStageButtonClicked = createEvent<0 | 1>();

export const nextStageButtonClicked = createEvent();
