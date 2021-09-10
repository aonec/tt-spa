import {
  switchIndividualDevice,
  SwitchIndividualDeviceRequestPayload,
} from './../../../../_api/individualDevices';
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
} from './index';
import { fetchIndividualDeviceFx } from '../../displayIndividualDevice/models';
import { getBitDepthAndScaleFactor } from '../../addIndividualDevice/utils';
import {
  IndividualDeviceResponse,
  SwitchIndividualDeviceReadingsCreateRequest,
  SwitchIndividualDeviceRequest,
} from 'myApi';
import { getArrayByCountRange } from '01/_pages/MetersPage/components/utils';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';
import moment from 'moment';

createIndividualDeviceFx.use(switchIndividualDevice);

$creationDeviceStage
  .on(switchStageButtonClicked, (_, stageNumber) => stageNumber)
  .reset(createIndividualDeviceFx.doneData);

sample({
  source: $creationDeviceStage.map((): 0 | 1 => 1),
  clock: goNextStage,
  target: switchStageButtonClicked,
});

forward({ from: addIndividualDeviceForm.formValidated, to: goNextStage });

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
    (device): SwitchIndividualDeviceReadingsCreateRequest[] =>
      device?.readings?.map(
        (elem): SwitchIndividualDeviceReadingsCreateRequest => ({
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

    return {
      resource: values.resource,
      mountPlaceId: values.deviceMountPlace?.id,
      bitDepth,
      scaleFactor,
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

  return { ...reading, readingDate: readingDate.toISOString() };
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
      lastCheckingDate: values.lastCheckingDate,
      futureCheckingDate: values.futureCheckingDate,
      lastCommercialAccountingDate: values.lastCommercialAccountingDate,
      bitDepth: Number(values.bitDepth),
      scaleFactor: Number(values.scaleFactor),
      rateType: values.rateType,
      model: values.model,
      documentsIds: toArray<FileData>(values.documentsIds, false)
        .filter((elem) => elem?.fileResponse)
        .map((elem) => elem.fileResponse?.id!),
      contractorId: values.contractorId,
      oldDeviceReadings: mapArray(
        values.oldDeviceReadings,
        upMonthInReading,
        (elem) =>
          clearEmptyValueFields(
            elem,
            getIndividualDeviceRateNumByName(values.rateType)
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

