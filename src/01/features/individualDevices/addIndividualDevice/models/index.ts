import {
  EResourceType,
  MeteringDeviceResponse,
  EIndividualDeviceRateType,
} from './../../../../../myApi';
import { createEvent, createStore, createEffect } from 'effector';
import { createForm } from 'effector-forms/dist';
import { FileData } from '01/hooks/useFilesUpload';
import { CreateCreateIndividualDeviceWithMagnetSealRequest } from '01/_api/individualDevices';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';

export const $creationDeviceStage = createStore<0 | 1>(0);
export const $isCreateIndividualDeviceSuccess = createStore<boolean | null>(
  null
);
export const $isCheckCreationDeviceFormDataModalOpen = createStore(false);

const readingsValuesValidators = [
  {
    name: 'requiredFirstField',
    validator: (value: any) => Boolean(value.value1),
  },
  {
    name: 'requiredSecondField',
    validator: (value: any, form: any) => {
      const rateNum = getIndividualDeviceRateNumByName(form.rateType);

      const needToValidate = rateNum >= 2;

      return needToValidate ? Boolean(value.value2) : true;
    },
  },
  {
    name: 'requiredThirdField',
    validator: (value: any, form: any) => {
      const rateNum = getIndividualDeviceRateNumByName(form.rateType);

      const needToValidate = rateNum >= 3;

      console.log(needToValidate, rateNum);

      return needToValidate ? Boolean(value.value3) : true;
    },
  },
];

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
      init: { value1: null, value2: null, value3: null, value4: null } as {
        [key: string]: number | null;
      },
      rules: readingsValuesValidators,
    },
    defaultReadings: {
      init: { value1: null, value2: null, value3: null, value4: null } as {
        [key: string]: number | null;
      },
      rules: readingsValuesValidators,
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
  CreateCreateIndividualDeviceWithMagnetSealRequest,
  MeteringDeviceResponse
>();
