import { createEvent, createStore } from 'effector';
import { combine, sample, split } from 'effector';
import { createGate } from 'effector-react';
import {
  CheckIndividualDevicePayload,
  SwitchIndividualDevicePayload,
  WorkWithIndividualDeviceType,
} from './workWithIndividualDeviceService.types';
import { displayIndividualDeviceAndNamesService } from '../displayIndividualDeviceAndNamesService';
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
import { WorkWithIndividualDeviceFormType } from './view/WorkWithIndividualDevicePage/WorkWithIndividualDeviceForm/WorkWithIndividualDeviceForm.types';

const WorkWithIndividualDeviceGate = createGate<{
  type: WorkWithIndividualDeviceType;
}>();

const onSubmitCapture = createEvent();

const setInitialFormValues =
  createEvent<WorkWithIndividualDeviceFormType | null>();

const handleSubmitForm = createEvent<WorkWithIndividualDeviceFormType>();

const $deviceInfoForm = createStore<WorkWithIndividualDeviceFormType | null>(
  null,
)
  .on(setInitialFormValues, (_, data) => data)
  .on(handleSubmitForm, (_, formData) => formData)
  .reset(WorkWithIndividualDeviceGate.close);

const $deviceType = WorkWithIndividualDeviceGate.state.map(
  ({ type }) => type || null,
);

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
  source: $deviceType,
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
  source: $deviceType,
  clock: [deviceChecked, deviceSwitched],
  target: actionSucceed,
});

sample({
  source: combine(
    $deviceInfoForm,
    $individualDevice,
    (deviceInfoForm, device) => {
      const oldDeviceReadingsArr = Object.values(
        deviceInfoForm?.oldDeviceReadings || [],
      );
      const newDeviceReadingsArr = Object.values(
        deviceInfoForm?.newDeviceReadings || [],
      );

      const readingsAfterCheck = compareReadingsArrWithSameIndex(
        newDeviceReadingsArr,
        oldDeviceReadingsArr,
      );

      return {
        currentCheckingDate: deviceInfoForm?.lastCheckingDate,
        futureCheckingDate: deviceInfoForm?.futureCheckingDate,
        readingsAfterCheck,
        deviceId: device?.id || null,
      };
    },
  ),
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
  $deviceInfoForm,
  $individualDevice,
  (info, device) =>
    ({
      serialNumber: info?.serialNumber,
      rateType: info?.rateType,
      model: info?.model,
      contractorId: info?.contractorId,
      newDeviceMountPlaceId: info?.mountPlaceId,
      sealInstallationDate: info?.sealInstallationDate
        ? dayjs(info.sealInstallationDate).utcOffset(0, true).toISOString()
        : null,
      sealNumber: info?.sealNumber,
      oldDeviceClosingReason: info?.oldDeviceClosingReason || undefined,
      isPolling: info?.isPolling,

      lastCheckingDate: info?.lastCheckingDate
        ? dayjs(info?.lastCheckingDate).utcOffset(0).toISOString()
        : null,
      futureCheckingDate: info?.futureCheckingDate
        ? dayjs(info.futureCheckingDate).utcOffset(0).toISOString()
        : null,
      bitDepth: Number(info?.bitDepth),
      scaleFactor: Number(info?.scaleFactor),
      oldDeviceReadings: compareReadingsArrWithSameIndex(
        Object.values(info?.oldDeviceReadings || []),
        Object.values(prepareDeviceReadings(device?.readings || [])),
      ),
      newDeviceReadings: compareReadingsArrWithSameIndex(
        Object.values(info?.newDeviceReadings || []),
        Object.values(prepareDeviceReadings([])),
      ),
      deviceId: device?.id,
    } as SwitchIndividualDevicePayload),
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
  target: getSerialNumberQuery.reset,
});

sample({
  clock: combine($individualDevice, $deviceType, (device, type) => ({
    device,
    type,
  })),
  fn: ({ device: values, type }) => {
    if (!values) return null;

    const { bitDepth, scaleFactor } = getBitDepthAndScaleFactor(
      values.resource,
    );
    const oldDeviceReadings = prepareDeviceReadings(values.readings || []);

    const isCheck = type === WorkWithIndividualDeviceType.check;
    const isSwitch = type === WorkWithIndividualDeviceType.switch;
    const isReopen = type === WorkWithIndividualDeviceType.reopen;

    const serialNumberAfterString = isReopen ? '*' : '';

    const initialFormValues: WorkWithIndividualDeviceFormType = {
      bitDepth: values.bitDepth || bitDepth,
      contractorId: values.contractorId,
      documentsIds: [],
      futureCheckingDate:
        isCheck || isSwitch ? null : values.futureCheckingDate,
      lastCheckingDate: isCheck || isSwitch ? null : values.lastCheckingDate,
      isPolling: values.isPolling,
      lastCommercialAccountingDate: null,
      model: isSwitch ? null : values.model,
      mountPlaceId: values.deviceMountPlace?.id || null,
      newDeviceReadings: prepareDeviceReadings([]),
      oldDeviceReadings,
      oldDeviceClosingReason: null,
      rateType: values.rateType,
      resource: values.resource,
      scaleFactor: values.scaleFactor || scaleFactor,
      sealInstallationDate: values.sealInstallationDate,
      sealNumber: values.sealNumber,
      serialNumber: isSwitch
        ? null
        : `${values.serialNumber}${serialNumberAfterString}`,
    };

    return initialFormValues;
  },
  target: setInitialFormValues,
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
    onSubmitCapture,
    handleSubmitForm,
  },
  outputs: {
    $individualDevice,
    $isDeviceLoading:
      displayIndividualDeviceAndNamesService.outputs.$isIndividualDeviceLoading,
    $deviceInfoForm,
  },
  gates: {
    WorkWithIndividualDeviceGate,
    IndividualDeviceGate:
      displayIndividualDeviceAndNamesService.gates.IndividualDeviceGate,
  },
};
