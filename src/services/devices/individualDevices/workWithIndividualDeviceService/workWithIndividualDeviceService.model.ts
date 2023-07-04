import { combine, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  PreparedForFormReadings,
  WorkWithIndividualDeviceType,
} from './workWithIndividualDeviceService.types';
import { displayIndividualDeviceAndNamesService } from '../displayIndividualDeviceAndNamesService';
import { createForm } from 'effector-forms';
import {
  EClosingReason,
  EIndividualDeviceRateType,
  EResourceType,
} from 'myApi';
import { getBitDepthAndScaleFactor } from 'utils/getBitDepthAndScaleFactor';
import { getSerialNumberQuery } from './workWithIndividualDeviceService.api';
import { prepareDeviceReadings } from './workWithIndividualDeviceService.utils';

const WorkWithIndividualDeviceGate = createGate<{
  type: WorkWithIndividualDeviceType;
}>();

const domain = createDomain('workWithIndividualDeviceService');

const deviceInfoForm = createForm({
  domain,
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
      init: null as EClosingReason | null,
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
            return Boolean(Object.values(value).length);
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

const fetchSerialNumberForCheck = domain.createEvent<string>();

sample({
  clock: fetchSerialNumberForCheck,
  target: getSerialNumberQuery.start,
});

sample({
  clock: WorkWithIndividualDeviceGate.close,
  target: deviceInfoForm.reset,
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

export const workWithIndividualDeviceService = {
  inputs: {
    fetchSerialNumberForCheck,
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
