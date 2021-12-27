import { switchIndividualDevice } from './../../../../_api/individualDevices';
import {
  $individualDevice,
  IndividualDeviceGate,
} from './../../displayIndividualDevice/models/index';
import {
  $individualDeviceMountPlaces,
  fetchIndividualDeviceFxMountPlacesFx,
} from './../../../individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models/index';
import { FileData } from '01/hooks/useFilesUpload';
import { forward, sample, combine } from 'effector';
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
} from './index';
import { fetchIndividualDeviceFx } from '../../displayIndividualDevice/models';
import { getBitDepthAndScaleFactor } from '../../addIndividualDevice/utils';
import {
  EIndividualDeviceRateType,
  IndividualDeviceReadingsResponse,
  SwitchIndividualDeviceReadingsCreateRequest,
  SwitchIndividualDeviceRequest,
} from 'myApi';
import { getArrayByCountRange } from '01/_pages/MetersPage/components/utils';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';
import moment from 'moment';
import { getReadingValuesArray } from '../components/ReadingsInput';

createIndividualDeviceFx.use(switchIndividualDevice);

$creationDeviceStage
  .on(switchStageButtonClicked, (_, stageNumber) => stageNumber)
  .reset(createIndividualDeviceFx.doneData);

sample({
  source: $creationDeviceStage.map((): 0 | 1 => 1),
  clock: goNextStage,
  target: switchStageButtonClicked,
});

$isCheckCreationDeviceFormDataModalOpen
  .on(checkBeforSavingButtonClicked, () => true)
  .reset([cancelCheckingButtonClicked, createIndividualDeviceFx.doneData]);

forward({
  from: createIndividualDeviceFx.doneData,
  to: addIndividualDeviceForm.reset,
});

$isCreateIndividualDeviceSuccess
  .on(createIndividualDeviceFx.doneData, () => true)
  .reset(resetCreationRequestStatus);

forward({
  from: fetchIndividualDeviceFx.doneData.map(
    (
      device
    ): (SwitchIndividualDeviceReadingsCreateRequest & { id: number })[] =>
      device?.readings?.map(
        (
          elem
        ): SwitchIndividualDeviceReadingsCreateRequest & { id: number } => ({
          id: elem.id,
          value1: Number(elem.value1),
          value2: Number(elem.value2),
          value3: Number(elem.value3),
          value4: Number(elem.value4),
          readingDate: elem.readingDateTime,
        })
      ) || []
  ),
  to: addIndividualDeviceForm.fields.oldDeviceReadings.$value,
});

forward({
  from: fetchIndividualDeviceFx.doneData.map((values) => {
    const { bitDepth, scaleFactor } = getBitDepthAndScaleFactor(
      values.resource
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
  to: addIndividualDeviceForm.setForm,
});

forward({
  from: IndividualDeviceGate.close,
  to: addIndividualDeviceForm.reset,
});

sample({
  source: combine(
    $individualDeviceMountPlaces,
    addIndividualDeviceForm.fields.mountPlaceId.$value,
    (places, name) => places?.find((elem) => elem.name === name)?.id || null
  ),
  clock: fetchIndividualDeviceFxMountPlacesFx.doneData,
  target: addIndividualDeviceForm.fields.mountPlaceId.set,
});

const clearEmptyValueFields = (
  reading: SwitchIndividualDeviceReadingsCreateRequest,
  rateNum: number
): SwitchIndividualDeviceReadingsCreateRequest => {
  const clearValues = getArrayByCountRange(rateNum, (index) => ({
    [`value${index}`]: Number((reading as any)[`value${index}`]),
  })).reduce((acc, elem) => ({ ...acc, ...elem }), {});

  return { ...clearValues, readingDate: reading.readingDate } as any;
};

const upMonthInReading = (
  reading: SwitchIndividualDeviceReadingsCreateRequest
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

sample({
  source: combine(
    addIndividualDeviceForm.$values,
    $individualDevice,
    (values, device) => ({ values, device })
  ).map(
    ({ values, device }): SwitchIndividualDeviceRequest => ({
      deviceId: device?.id!,
      serialNumber: values.serialNumber,
      lastCheckingDate: moment(values.lastCheckingDate)
        .set({ hour: 21, minute: 0, second: 0, millisecond: 0 })
        .toISOString(true),
      futureCheckingDate: moment(values.futureCheckingDate)
        .set({ hour: 21, minute: 0, second: 0, millisecond: 0 })
        .toISOString(true),
      // lastCommercialAccountingDate: values.lastCommercialAccountingDate,
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
          device?.rateType!
        ),
        upMonthInReading,
        (elem) =>
          clearEmptyValueFields(
            elem,
            getIndividualDeviceRateNumByName(device?.rateType!)
          )
      ),
      newDeviceReadings: mapArray(
        values.newDeviceReadings,
        upMonthInReading,
        (elem) =>
          clearEmptyValueFields(
            elem,
            getIndividualDeviceRateNumByName(values.rateType)
          )
      ),
      sealInstallationDate: values.magneticSealInstallationDate,
      sealNumber: values.magneticSealTypeName,
      oldDeviceClosingReason: values.oldDeviceClosingReason || undefined,
    })
  ),
  clock: confirmCreationNewDeviceButtonClicked,
  target: createIndividualDeviceFx,
});

forward({
  from: addIndividualDeviceForm.formValidated,
  to: checkBeforSavingButtonClicked,
});

function getChangedReadings(
  prevReadings: IndividualDeviceReadingsResponse[],
  currentReadings: (SwitchIndividualDeviceReadingsCreateRequest & {
    id?: number;
  })[],
  deviceRateType: EIndividualDeviceRateType
) {
  const rateNum = getIndividualDeviceRateNumByName(deviceRateType);

  const res = currentReadings.filter((newReading) => {
    if (!newReading.id) return true;

    const neededPrevReading = prevReadings.find(
      (prevReading) => prevReading.id === newReading.id
    );

    if (!neededPrevReading) return true;

    const oldDeviceReadingValues: string[] = getReadingValuesArray(
      clearEmptyValueFields(neededPrevReading as any, rateNum),
      rateNum
    )?.value as string[];

    const formOldDeviceValues: string[] = getReadingValuesArray(
      clearEmptyValueFields(newReading as any, rateNum),
      rateNum
    )?.value as string[];

    if (compareArrays(oldDeviceReadingValues, formOldDeviceValues))
      return false;

    return true;
  });

  return res;
}

const compareArrays = <T>(array1: T[], array2: T[]) =>
  array1.reduce((acc, elem, index) => acc && elem === array2[index], true);

const getSerialNumberAfterString = (type: 'switch' | 'check' | 'reopen') => {
  return {
    switch: '',
    check: '*П1',
    reopen: '*',
  }[type];
};
