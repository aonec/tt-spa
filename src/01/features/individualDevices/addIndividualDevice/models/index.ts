import {
  EResourceType,
  CreateIndividualDeviceRequest,
  MeteringDeviceResponseSuccessApiResponse,
} from './../../../../../myApi';
import { createEvent, createStore, createEffect } from 'effector';
import { createForm } from 'effector-forms/dist';
import { FileData } from '01/hooks/useFilesUpload';

export const $creationDeviceStage = createStore<0 | 1>(0);
export const $isCreateIndividualDeviceSuccess = createStore<boolean | null>(
  null
);
export const $isCheckCreationDeviceFormDataModalOpen = createStore(false);

export const addIndividualDeviceForm = createForm({
  fields: {
    serialNumber: {
      init: '',
      rules: [{ name: 'required', validator: Boolean }],
    },
    lastCheckingDate: {
      init: null as string | null,
    },
    futureCheckingDate: {
      init: null as string | null,
    },
    lastCommercialAccountingDate: {
      init: null as string | null,
    },
    documentsIds: {
      init: {
        completedWorks: null as FileData | null,
        devicePassport: null as FileData | null,
        deviceCheck: null as FileData | null,
      },
    },
    bitDepth: {
      init: null as number | null,
    },
    scaleFactor: {
      init: null as number | null,
    },
    apartmentId: {
      init: null as number | null,
    },
    mountPlaceId: {
      init: null as number | null,
    },
    model: {
      init: '',
    },
    startupReadings: {
      init: { value1: 0, value2: 0, value3: 0, value4: 0 },
    },
    resource: {
      init: null as EResourceType | null,
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
  validateOn: ['submit'],
});

export const switchStageButtonClicked = createEvent<0 | 1>();
export const goNextStage = createEvent();

export const checkBeforSavingButtonClicked = createEvent();
export const cancelCheckingButtonClicked = createEvent();
export const confirmCreationNewDeviceButtonClicked = createEvent();
export const resetCreationRequestStatus = createEvent();

export const createIndividualDeviceFx = createEffect<
  CreateIndividualDeviceRequest,
  MeteringDeviceResponseSuccessApiResponse
>();
