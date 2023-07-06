import { switchIndividualDevice } from './../../../../_api/individualDevices';
import {
  forward,
  sample,
  combine,
  guard,
  createEffect,
  createEvent,
  createStore,
} from 'effector';
import { toArray } from '../components/CheckFormValuesModal';
import {
  $creationDeviceStage,
  $isCheckCreationDeviceFormDataModalOpen,
  addIndividualDeviceForm,
  cancelCheckingButtonClicked,
  checkBeforSavingButtonClicked,
  createIndividualDeviceFx,
  goNextStage,
  switchStageButtonClicked,
  confirmCreationNewDeviceButtonClicked,
  $isCreateIndividualDeviceSuccess,
  resetCreationRequestStatus,
  SwitchIndividualDeviceGate,
  $typeOfIndividualDeviceForm,
  checkIndividualDeviceFx,
  ApartmentIdGate,
} from './index';
import {
  EIndividualDeviceRateType,
  IndividualDeviceListResponseFromDevicePagePagedList,
  IndividualDeviceReadingsResponse,
  SwitchIndividualDeviceReadingsCreateRequest,
  SwitchIndividualDeviceRequest,
} from 'myApi';
import moment from 'moment';
import { getReadingValuesArray } from '../components/ReadingsInput';
import { getIndividualDeviceRateNumByName } from 'utils/getIndividualDeviceRateNumByName';
import { axios } from '01/axios';
import { getFilledArray } from 'utils/getFilledArray';
import { message } from 'antd';
import { FileData } from 'ui-kit/DocumentsService/DocumentsService.types';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService';
import { getBitDepthAndScaleFactor } from 'utils/getBitDepthAndScaleFactor';
import { displayIndividualDeviceAndNamesService } from 'services/devices/individualDevices/displayIndividualDeviceAndNamesService/displayIndividualDeviceAndNamesService.model';

const {
  outputs: { $individualDevice },
  gates: { IndividualDeviceGate },
} = displayIndividualDeviceAndNamesService;

createIndividualDeviceFx.use(switchIndividualDevice);

createIndividualDeviceFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

$creationDeviceStage
  .on(switchStageButtonClicked, (_, stageNumber) => stageNumber)
  .reset([createIndividualDeviceFx.doneData, checkIndividualDeviceFx.doneData]);

forward({
  from: ApartmentIdGate.open.map(({ apartmentId }) => apartmentId),
  to: addIndividualDeviceForm.fields.apartmentId.onChange,
});

sample({
  source: $creationDeviceStage.map((): 0 | 1 => 1),
  clock: goNextStage,
  target: switchStageButtonClicked,
});

$isCheckCreationDeviceFormDataModalOpen
  .on(checkBeforSavingButtonClicked, () => true)
  .reset([
    cancelCheckingButtonClicked,
    createIndividualDeviceFx.doneData,
    checkIndividualDeviceFx.doneData,
  ]);

forward({
  from: [createIndividualDeviceFx.doneData, checkIndividualDeviceFx.doneData],
  to: addIndividualDeviceForm.reset,
});

$isCreateIndividualDeviceSuccess
  .on(checkIndividualDeviceFx.doneData, () => true)
  .on(createIndividualDeviceFx.doneData, () => true)
  .reset(resetCreationRequestStatus);

forward({
  from: $individualDevice.map(
    (
      device,
    ): (SwitchIndividualDeviceReadingsCreateRequest & { id: number })[] =>
      device?.readings?.map(
        (
          elem,
        ): SwitchIndividualDeviceReadingsCreateRequest & { id: number } => ({
          id: elem.id,
          value1: Number(elem.value1),
          value2: Number(elem.value2),
          value3: Number(elem.value3),
          value4: Number(elem.value4),
          readingDate: elem.readingDateTime,
        }),
      ) || [],
  ),
  to: addIndividualDeviceForm.fields.oldDeviceReadings.$value,
});

sample({
  clock: $individualDevice.map((values) => {
    // eslint-disable-next-line array-callback-return
    if (!values) return;

    const { bitDepth, scaleFactor } = getBitDepthAndScaleFactor(
      values.resource,
    );

    const type = SwitchIndividualDeviceGate.state
      .map(({ type }) => type)
      .getState();

    const isCheck = type === 'check';
    const isSwitch = type === 'switch';

    const serialNumberAfterString = getSerialNumberAfterString(type);

    return {
      ...values,
      bitDepth: values.bitDepth || bitDepth,
      scaleFactor: values.scaleFactor || scaleFactor,
      mountPlaceId: values.deviceMountPlace?.id,
      serialNumber: `${values.serialNumber}${serialNumberAfterString}`,
      ...(isCheck || isSwitch
        ? { lastCheckingDate: null, futureCheckingDate: null }
        : {}),

      ...(isSwitch ? { model: '', serialNumber: '' } : {}),
    } as any;
  }),
  target: addIndividualDeviceForm.setForm,
});

sample({
  clock: IndividualDeviceGate.close,
  target: addIndividualDeviceForm.reset,
});

sample({
  source: combine(
    individualDeviceMountPlacesService.outputs.$individualDeviceMountPlaces,
    addIndividualDeviceForm.fields.mountPlaceId.$value,
    (places, name) => places?.find((elem) => elem.name === name)?.id || null,
  ),
  clock:
    individualDeviceMountPlacesService.outputs.$individualDeviceMountPlaces,
  target: addIndividualDeviceForm.fields.mountPlaceId.set,
});

export const clearEmptyValueFields = (
  reading: SwitchIndividualDeviceReadingsCreateRequest,
  rateNum: number,
): SwitchIndividualDeviceReadingsCreateRequest => {
  const clearValues = getFilledArray(rateNum, (index) => ({
    [`value${index + 1}`]: Number((reading as any)[`value${index + 1}`]),
  })).reduce((acc, elem) => ({ ...acc, ...elem }), {});

  return { ...clearValues, readingDate: reading.readingDate } as any;
};

const upMonthInReading = (
  reading: SwitchIndividualDeviceReadingsCreateRequest,
) => {
  const readingDate = moment(reading.readingDate);

  readingDate.add(1, 'month');

  return { ...reading, readingDate: readingDate.toISOString(true) };
};

const mapArray = <T>(array: T[], ...callbacks: ((elem: T) => T)[]) => {
  let res = array;

  for (const callback of callbacks) {
    res = res.map(callback);
  }

  return res;
};

guard({
  clock: confirmCreationNewDeviceButtonClicked,
  source: combine(
    addIndividualDeviceForm.$values,
    $individualDevice,
    $typeOfIndividualDeviceForm,
    (values, device, type) => {
      if (type === 'check') {
        return null;
      }
      return {
        requestPayload: {
          serialNumber: values.serialNumber,
          lastCheckingDate: moment(values.lastCheckingDate)
            .utcOffset(0, true)
            .toISOString(true),
          futureCheckingDate: moment(values.futureCheckingDate)
            .utcOffset(0, true)
            .toISOString(),
          bitDepth: Number(values.bitDepth),
          scaleFactor: Number(values.scaleFactor),
          rateType: values.rateType,
          model: values.model,
          documentsIds: toArray<FileData>(values.documentsIds, false)
            .filter((elem) => elem?.fileResponse)
            .map((elem) => elem.fileResponse?.id!),
          contractorId: values.contractorId,
          oldDeviceReadings: mapArray(
            getChangedReadings(
              device?.readings!,
              values.oldDeviceReadings,
              device?.rateType!,
            ),
            upMonthInReading,
            (elem) =>
              clearEmptyValueFields(
                elem,
                getIndividualDeviceRateNumByName(device?.rateType!),
              ),
          ),
          newDeviceReadings: mapArray(
            values.newDeviceReadings,
            upMonthInReading,
            (elem) =>
              clearEmptyValueFields(
                elem,
                getIndividualDeviceRateNumByName(values.rateType),
              ),
          ),
          sealInstallationDate: values.sealInstallationDate,
          sealNumber: values.sealNumber,
          oldDeviceClosingReason: values.oldDeviceClosingReason || undefined,
          isPolling: values.isPolling,
        } as SwitchIndividualDeviceRequest,

        deviceId: device?.id!,
      };
    },
  ),
  filter: Boolean,
  target: createIndividualDeviceFx,
});

forward({
  from: addIndividualDeviceForm.formValidated,
  to: checkBeforSavingButtonClicked,
});

createIndividualDeviceFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

export function getChangedReadings(
  prevReadings: IndividualDeviceReadingsResponse[],
  currentReadings: (SwitchIndividualDeviceReadingsCreateRequest & {
    id?: number;
  })[],
  deviceRateType: EIndividualDeviceRateType,
) {
  const rateNum = getIndividualDeviceRateNumByName(deviceRateType);

  const res = currentReadings.filter((newReading) => {
    if (!newReading.id) return true;

    const neededPrevReading = prevReadings.find(
      (prevReading) => prevReading.id === newReading.id,
    );

    if (!neededPrevReading) return true;

    const oldDeviceReadingValues: string[] = getReadingValuesArray(
      clearEmptyValueFields(neededPrevReading as any, rateNum),
      rateNum,
    )?.value as string[];

    const formOldDeviceValues: string[] = getReadingValuesArray(
      clearEmptyValueFields(newReading as any, rateNum),
      rateNum,
    )?.value as string[];

    if (compareArrays(oldDeviceReadingValues, formOldDeviceValues))
      return false;

    return true;
  });

  return res;
}

export const compareArrays = <T>(array1: T[], array2: T[]) =>
  array1.reduce((acc, elem, index) => acc && elem === array2[index], true);

export const getSerialNumberAfterString = (
  type: 'switch' | 'check' | 'reopen',
) => {
  return {
    switch: '',
    check: '',
    reopen: '*',
  }[type];
};

const getSerialNumberForCheck = (
  serialNumber: string,
): Promise<IndividualDeviceListResponseFromDevicePagePagedList> =>
  axios.get('devices/individual', {
    params: {
      serialNumber,
    },
  });

const fetchSerialNumberForCheckFx = createEffect<
  string,
  IndividualDeviceListResponseFromDevicePagePagedList
>(getSerialNumberForCheck);

export const handleFetchSerialNumberForCheck = createEvent<string>();

forward({
  from: handleFetchSerialNumberForCheck,
  to: fetchSerialNumberForCheckFx,
});

export const $serialNumberForChecking =
  createStore<IndividualDeviceListResponseFromDevicePagePagedList | null>(null)
    .on(fetchSerialNumberForCheckFx.doneData, (_, data) => data)
    .reset(fetchSerialNumberForCheckFx);

export const $isFetchSerialNumberLoading = fetchSerialNumberForCheckFx.pending;
