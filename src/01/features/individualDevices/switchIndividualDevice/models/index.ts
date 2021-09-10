import {
  EResourceType,
  MeteringDeviceResponse,
  EIndividualDeviceRateType,
  SwitchIndividualDeviceReadingsCreateRequest,
  EClosingReason,
  SwitchIndividualDeviceRequest,
} from './../../../../../myApi';
import { createEvent, createStore, createEffect } from 'effector';
import { createForm } from 'effector-forms/dist';
import { FileData } from '01/hooks/useFilesUpload';
export const $creationDeviceStage = createStore<0 | 1>(0);
export const $isCreateIndividualDeviceSuccess = createStore<boolean | null>(
  null
);
export const $isCheckCreationDeviceFormDataModalOpen = createStore(false);

export const readingValueValidate = (value: number | string | null) =>
  Number(value) === 0 && value !== null ? true : Boolean(value);

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
    oldDeviceClosingReason: {
      init: null as EClosingReason | null,
    },
    model: {
      init: '',
    },
    oldDeviceReadings: {
      init: [] as SwitchIndividualDeviceReadingsCreateRequest[],
    },
    newDeviceReadings: {
      init: [] as SwitchIndividualDeviceReadingsCreateRequest[],
      rules: [
        {
          name: 'required',
          validator: (value) => Boolean(value.length),
        },
      ],
    },
    rateType: {
      init: EIndividualDeviceRateType.OneZone as EIndividualDeviceRateType,
      rules: [{ name: 'required', validator: Boolean }],
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
    contractorId: {
      init: null as number | null,
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
  SwitchIndividualDeviceRequest,
  MeteringDeviceResponse
>();
