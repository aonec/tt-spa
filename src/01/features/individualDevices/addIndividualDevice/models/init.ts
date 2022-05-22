import {
  CreateIndividualDeviceRequest,
  EIndividualDeviceRateType,
  EResourceType,
} from './../../../../../myApi';
import { FileData } from '01/hooks/useFilesUpload';
import {
  CreateCreateIndividualDeviceWithMagnetSealRequest,
  createIndividualDevice,
} from '01/_api/individualDevices';
import { forward, sample } from 'effector';
import { BaseIndividualDeviceReadingsCreateRequest } from 'myApi';
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
import moment from 'moment';

createIndividualDeviceFx.use(createIndividualDevice);

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

sample({
  source: addIndividualDeviceForm.$values.map(
    (values): CreateIndividualDeviceRequest => ({
      serialNumber: values.serialNumber,
      lastCheckingDate: moment(values.lastCheckingDate)
        .set({ hour: 21, minute: 0, second: 0, millisecond: 0 })
        .toISOString(true),
      futureCheckingDate: moment(values.futureCheckingDate)
        .set({ hour: 21, minute: 0, second: 0, millisecond: 0 })
        .toISOString(true),
      bitDepth: Number(values.bitDepth),
      scaleFactor: Number(values.scaleFactor),
      apartmentId: values.apartmentId!,
      mountPlaceId: values.mountPlaceId,
      rateType: values.rateType,
      resource: values.resource!,
      model: values.model,
      documentsIds: toArray<FileData>(values.documentsIds, false)
        .filter((elem) => elem?.fileResponse)
        .map((elem) => elem.fileResponse?.id!),
      startupReadings: (values.startupReadings as unknown) as BaseIndividualDeviceReadingsCreateRequest,
      defaultReadings: (values.defaultReadings as unknown) as BaseIndividualDeviceReadingsCreateRequest,
    })
  ),
  clock: confirmCreationNewDeviceButtonClicked,
  target: createIndividualDeviceFx,
});
