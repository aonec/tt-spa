import { createEvent } from 'effector';
import { combine, sample, split } from 'effector';
import { createGate } from 'effector-react';
import {
  CheckIndividualDevicePayload,
  PreparedForFormReadings,
  SwitchIndividualDevicePayload,
  WorkWithIndividualDeviceType,
} from './workWithIndividualDeviceService.types';
import { displayIndividualDeviceAndNamesService } from '../displayIndividualDeviceAndNamesService';
import { createForm } from 'effector-forms';
import {
  EClosingReason,
  EIndividualDeviceRateType,
  EResourceType,
  ESwitchingReason,
} from 'api/types';
import { getBitDepthAndScaleFactor } from 'utils/getBitDepthAndScaleFactor';
import {
  checkIndividualDeviceMutation,
  getSerialNumberQuery,
  switchIndividualDeviceMutation,
} from './workWithIndividualDeviceService.api';
import {
  compareReadingsArrWithSameIndex,
  prepareDeviceReadings,
} from './workWithIndividualDeviceService.utils';
import { message } from 'antd';
import dayjs from 'api/dayjs';

const WorkWithIndividualDeviceGate = createGate<{
  type: WorkWithIndividualDeviceType;
}>();

const deviceInfoForm = createForm({
  fields: {
    model: {
      init: '',
    },
    serialNumber: {
      init: '',
      rules: [{ name: 'required', validator: Boolean }],
    },
    bitDepth: {
      init: null as number | null,
    },
    scaleFactor: {
      init: null as number | null,
    },
    rateType: {
      init: EIndividualDeviceRateType.OneZone as EIndividualDeviceRateType,
      rules: [{ name: 'required', validator: Boolean }],
    },
    sealNumber: {
      init: null as null | string,
    },
    sealInstallationDate: {
      init: null as null | string,
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
    contractorId: {
      init: null as number | null,
    },
    oldDeviceClosingReason: {
      init: null as EClosingReason | ESwitchingReason | null,
    },

    lastCommercialAccountingDate: {
      init: null as string | null,
    },
    documentsIds: {
      init: [] as number[],
    },
    isPolling: {
      init: false,
    },

    mountPlaceId: {
      init: null as number | null,
    },

    oldDeviceReadings: {
      init: prepareDeviceReadings([]) as {
        [key: number]: PreparedForFormReadings;
      },
    },
    newDeviceReadings: {
      init: prepareDeviceReadings([]) as {
        [key: number]: PreparedForFormReadings;
      },
      rules: [
        {
          name: 'required',
          source: WorkWithIndividualDeviceGate.state,
          validator: (value, _, type) => {
            if (type === 'check') {
              return true;
            }
            return Boolean(
              compareReadingsArrWithSameIndex(
                Object.values(value),
                Object.values(prepareDeviceReadings([])),
              )?.length,
            );
          },
        },
        {
          name: 'validReadings',
          validator: (value: { [key: number]: PreparedForFormReadings }) => {
            return !Object.entries(value)
              .map(([index, elem]) => {
                let isValid: boolean = true;

                for (let i = Number(index) + 1; i < 8; ++i) {
                  const prev = value[i];
                  if (!prev) {
                    continue;
                  }
                  const { value1, value2, value3, value4 } = elem;
                  if (value1) {
                    isValid = isValid && Number(value1) >= Number(prev.value1);
                  }
                  if (value2) {
                    isValid = isValid && Number(value2) >= Number(prev.value2);
                  }
                  if (value3) {
                    isValid = isValid && Number(value3) >= Number(prev.value3);
                  }
                  if (value4) {
                    isValid = isValid && Number(value4) >= Number(prev.value4);
                  }
                }

                return isValid;
              })
              .includes(false);
          },
        },
      ],
    },
    resource: {
      init: null as EResourceType | null,
      rules: [{ name: 'required', validator: Boolean }],
    },
  },
  validateOn: ['submit'],
});

const $individualDevice =
  displayIndividualDeviceAndNamesService.outputs.$individualDevice;

const deviceChecked = checkIndividualDeviceMutation.finished.success;
const deviceSwitched = switchIndividualDeviceMutation.finished.success;
const actionSucceed = createEvent<WorkWithIndividualDeviceType>();

const fetchSerialNumberForCheck = createEvent<string>();

const submitAction = createEvent();
const switchIndividualDevice = createEvent();
const checkIndividualDevice = createEvent();

split({
  source: WorkWithIndividualDeviceGate.state.map(({ type }) => type),
  clock: submitAction,
  match: (type: WorkWithIndividualDeviceType): WorkWithIndividualDeviceType =>
    type,
  cases: {
    [WorkWithIndividualDeviceType.check]: checkIndividualDevice,
    [WorkWithIndividualDeviceType.reopen]: switchIndividualDevice,
    [WorkWithIndividualDeviceType.switch]: switchIndividualDevice,
  },
});

sample({
  source: WorkWithIndividualDeviceGate.state.map(({ type }) => type),
  clock: [deviceChecked, deviceSwitched],
  target: actionSucceed,
});

sample({
  source: combine(deviceInfoForm.$values, $individualDevice, (info, device) => {
    const {
      lastCheckingDate,
      futureCheckingDate,
      newDeviceReadings,
      oldDeviceReadings,
    } = info;

    const oldDeviceReadingsArr = Object.values(oldDeviceReadings);
    const newDeviceReadingsArr = Object.values(newDeviceReadings);

    const readingsAfterCheck = compareReadingsArrWithSameIndex(
      newDeviceReadingsArr,
      oldDeviceReadingsArr,
    );

    return {
      currentCheckingDate: lastCheckingDate,
      futureCheckingDate,
      readingsAfterCheck,
      deviceId: device?.id || null,
    };
  }),
  clock: checkIndividualDevice,
  filter: (payload): payload is CheckIndividualDevicePayload =>
    Boolean(
      payload.currentCheckingDate &&
        payload.futureCheckingDate &&
        payload.deviceId,
    ),
  target: checkIndividualDeviceMutation.start,
});

const checkIndividualDevicePayload = combine(
  deviceInfoForm.$values,
  $individualDevice,
  (info, device) => ({
    serialNumber: info.serialNumber,
    rateType: info.rateType,
    model: info.model,
    contractorId: info.contractorId,
    sealInstallationDate: info.sealInstallationDate
      ? dayjs(info.sealInstallationDate).utcOffset(0, true).toISOString()
      : null,
    sealNumber: info.sealNumber,
    oldDeviceClosingReason: info.oldDeviceClosingReason || undefined,
    isPolling: info.isPolling,

    lastCheckingDate: info.lastCheckingDate
      ? dayjs(info.lastCheckingDate).utcOffset(0).toISOString()
      : null,
    futureCheckingDate: info.futureCheckingDate
      ? dayjs(info.futureCheckingDate).utcOffset(0).toISOString()
      : null,
    bitDepth: Number(info.bitDepth),
    scaleFactor: Number(info.scaleFactor),
    oldDeviceReadings: compareReadingsArrWithSameIndex(
      Object.values(info.oldDeviceReadings),
      Object.values(prepareDeviceReadings(device?.readings || [])),
    ),
    newDeviceReadings: compareReadingsArrWithSameIndex(
      Object.values(info.newDeviceReadings),
      Object.values(prepareDeviceReadings([])),
    ),
    deviceId: device?.id,
  }),
);

sample({
  source: checkIndividualDevicePayload,
  filter: (payload): payload is SwitchIndividualDevicePayload =>
    Boolean(payload.deviceId),
  clock: switchIndividualDevice,
  target: switchIndividualDeviceMutation.start,
});

sample({
  clock: fetchSerialNumberForCheck,
  target: getSerialNumberQuery.start,
});

sample({
  clock: WorkWithIndividualDeviceGate.close,
  target: [deviceInfoForm.reset, getSerialNumberQuery.reset],
});

sample({
  clock: combine(
    $individualDevice,
    WorkWithIndividualDeviceGate.state,
    (device, gate) => ({ device, gate }),
  ),
  fn: ({ device: values, gate }) => {
    if (!values) return {};

    const { bitDepth, scaleFactor } = getBitDepthAndScaleFactor(
      values.resource,
    );
    const oldDeviceReadings = prepareDeviceReadings(values.readings || []);

    const isCheck = gate.type === WorkWithIndividualDeviceType.check;
    const isSwitch = gate.type === WorkWithIndividualDeviceType.switch;
    const isReopen = gate.type === WorkWithIndividualDeviceType.reopen;

    const serialNumberAfterString = isReopen ? '*' : '';

    return {
      ...values,
      bitDepth: values.bitDepth || bitDepth,
      scaleFactor: values.scaleFactor || scaleFactor,
      mountPlaceId: values.deviceMountPlace?.id,
      oldDeviceReadings,
      serialNumber: `${values.serialNumber}${serialNumberAfterString}`,
      ...(isCheck || isSwitch
        ? { lastCheckingDate: null, futureCheckingDate: null }
        : {}),

      ...(isSwitch ? { model: '', serialNumber: '' } : {}),
    };
  },
  target: deviceInfoForm.set,
});

switchIndividualDeviceMutation.finished.failure.watch(({ error }) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

checkIndividualDeviceMutation.finished.failure.watch(({ error }) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

actionSucceed.watch((type) => {
  if (type === WorkWithIndividualDeviceType.check) {
    return message.success('Прибор успешно поверен!');
  }
  if (type === WorkWithIndividualDeviceType.reopen) {
    return message.success('Прибор успешно переоткрыт!');
  }
  if (type === WorkWithIndividualDeviceType.switch) {
    return message.success('Прибор успешно заменён!');
  }
});

export const workWithIndividualDeviceService = {
  inputs: {
    fetchSerialNumberForCheck,
    submitAction,
    actionSucceed,
  },
  outputs: {
    $individualDevice,
    $isDeviceLoading:
      displayIndividualDeviceAndNamesService.outputs.$isIndividualDeviceLoading,
  },
  gates: {
    WorkWithIndividualDeviceGate,
    IndividualDeviceGate:
      displayIndividualDeviceAndNamesService.gates.IndividualDeviceGate,
  },
  forms: { deviceInfoForm },
};
