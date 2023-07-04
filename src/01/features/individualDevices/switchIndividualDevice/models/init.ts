import { switchIndividualDevice } from './../../../../_api/individualDevices';
import { forward, sample, combine, guard } from 'effector';
import { toArray } from '../components/CheckFormValuesModal';
import {
  $isCheckCreationDeviceFormDataModalOpen,
  addIndividualDeviceForm,
  cancelCheckingButtonClicked,
  checkBeforSavingButtonClicked,
  createIndividualDeviceFx,
  confirmCreationNewDeviceButtonClicked,
  $typeOfIndividualDeviceForm,
  checkIndividualDeviceFx,
} from './index';
import {
  EIndividualDeviceRateType,
  IndividualDeviceReadingsResponse,
  SwitchIndividualDeviceReadingsCreateRequest,
  SwitchIndividualDeviceRequest,
} from 'myApi';
import moment from 'moment';
import { getIndividualDeviceRateNumByName } from 'utils/getIndividualDeviceRateNumByName';
import { getFilledArray } from 'utils/getFilledArray';
import { message } from 'antd';
import { FileData } from 'ui-kit/DocumentsService/DocumentsService.types';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService';
import { displayIndividualDeviceAndNamesService } from 'services/devices/individualDevices/displayIndividualDeviceAndNamesService/displayIndividualDeviceAndNamesService.model';

const getReadingValuesArray = (a: any, b: any): { value: string[] } => ({
  value: [],
});

const {
  outputs: { $individualDevice },
} = displayIndividualDeviceAndNamesService;

createIndividualDeviceFx.use(switchIndividualDevice);

createIndividualDeviceFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
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
