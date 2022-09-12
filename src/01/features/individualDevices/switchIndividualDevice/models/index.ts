import {
  EResourceType,
  MeteringDeviceResponse,
  EIndividualDeviceRateType,
  SwitchIndividualDeviceReadingsCreateRequest,
  EClosingReason,
  SwitchIndividualDeviceRequest,
} from './../../../../../myApi';
import {
  createEvent,
  createStore,
  createEffect,
  combine,
  guard,
} from 'effector';
import { createForm } from 'effector-forms/dist';
import { FileData } from '01/hooks/useFilesUpload';
import { checkIndividualDevice } from '01/_api/individualDevices';
import { CheckIndividualDevicePayload } from '../switchIndividualDevice.types';
import { $individualDevice } from '../../displayIndividualDevice/models';
import { createGate } from 'effector-react';
import moment from 'moment';

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
      init: [] as (SwitchIndividualDeviceReadingsCreateRequest & {
        id?: number;
      })[],
    },
    newDeviceReadings: {
      init: [] as SwitchIndividualDeviceReadingsCreateRequest[],
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
  SwitchIndividualDeviceRequest,
  MeteringDeviceResponse
>();

export const checkIndividualDeviceFx = createEffect<
  CheckIndividualDevicePayload,
  void
>(checkIndividualDevice);

export const SwitchIndividualDeviceGate = createGate<{
  type: 'reopen' | 'check' | 'switch';
}>();

export const $typeOfIndividualDeviceForm = SwitchIndividualDeviceGate.state.map(
  ({ type }) => type
);

guard({
  source: combine(
    addIndividualDeviceForm.$values,
    $individualDevice,
    $typeOfIndividualDeviceForm,
    (values, device, type) => {
      const {
        lastCheckingDate,
        futureCheckingDate,
        newDeviceReadings,
      } = values;

      if (
        !lastCheckingDate ||
        !futureCheckingDate ||
        !device ||
        type !== 'check'
      ) {
        return null;
      }

      const readingsAfterCheck = newDeviceReadings.length
        ? newDeviceReadings.map((readings) => {
            const { readingDate, value1, value2, value3, value4 } = readings;
            return {
              readingDate: moment(readingDate).add(1, 'month').toISOString(),
              value1: Number(value1),
              value2: Number(value2) || null,
              value3: Number(value3) || null,
              value4: Number(value4) || null,
            };
          })
        : null;

      return {
        currentCheckingDate: lastCheckingDate,
        futureCheckingDate,
        readingsAfterCheck,
        deviceId: device.id,
      };
    }
  ),
  clock: confirmCreationNewDeviceButtonClicked,
  filter: Boolean,
  target: checkIndividualDeviceFx,
});
