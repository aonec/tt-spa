import {
  EResourceType,
  EIndividualDeviceRateType,
  SwitchIndividualDeviceReadingsCreateRequest,
  EClosingReason,
  SwitchIndividualDeviceRequest,
  IndividualDeviceResponse,
} from './../../../../../myApi';
import { createEvent, createStore, createEffect } from 'effector';
import { createForm } from 'effector-forms';
import { checkIndividualDevice } from '01/_api/individualDevices';
import { CheckIndividualDevicePayload } from '../switchIndividualDevice.types';
import { createGate } from 'effector-react';
import { EffectFailDataAxiosError } from 'types';
import { Document } from 'ui-kit/DocumentsService';

export const $isCreateIndividualDeviceSuccess = createStore<boolean | null>(
  null,
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
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    futureCheckingDate: {
      init: null as string | null,
      rules: [
        {
          name: 'required',
          validator: Boolean,
        },
      ],
    },
    lastCommercialAccountingDate: {
      init: null as string | null,
    },
    documentsIds: {
      init: {
        completedWorks: null as Document | null,
        devicePassport: null as Document | null,
        deviceCheck: null as Document | null,
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
      init: [] as (SwitchIndividualDeviceReadingsCreateRequest & {
        id?: number;
      })[],
    },
    newDeviceReadings: {
      init: [] as (SwitchIndividualDeviceReadingsCreateRequest & {
        id?: number;
      })[],
      rules: [
        {
          name: 'required',
          validator: (value) => {
            if ($typeOfIndividualDeviceForm.getState() === 'check') {
              return true;
            }
            return Boolean(value.length);
          },
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
    sealInstallationDate: {
      init: null as null | string,
    },
    sealNumber: {
      init: null as null | string,
    },
    contractorId: {
      init: null as number | null,
    },
    isPolling: {
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
  {
    deviceId: number;
    requestPayload: SwitchIndividualDeviceRequest;
  },
  IndividualDeviceResponse | null,
  EffectFailDataAxiosError
>();

export const checkIndividualDeviceFx = createEffect<
  CheckIndividualDevicePayload,
  void,
  EffectFailDataAxiosError
>(checkIndividualDevice);

export const SwitchIndividualDeviceGate = createGate<{
  type: 'reopen' | 'check' | 'switch';
}>();

export const $typeOfIndividualDeviceForm = SwitchIndividualDeviceGate.state.map(
  ({ type }) => type,
);
