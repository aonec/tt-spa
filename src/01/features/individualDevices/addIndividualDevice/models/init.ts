import { CreateIndividualDeviceRequest } from './../../../../../myApi';
import { createIndividualDevice } from '01/_api/individualDevices';
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
  AddIndividualDeviceDate,
} from './index';
import moment from 'moment';
import { message } from 'antd';
import { Document } from 'ui-kit/DocumentsService';

createIndividualDeviceFx.use(createIndividualDevice);

$creationDeviceStage
  .on(switchStageButtonClicked, (_, stageNumber) => stageNumber)
  .reset(createIndividualDeviceFx.doneData);

forward({
  from: AddIndividualDeviceDate.open.map(({ id }) => id),
  to: addIndividualDeviceForm.fields.apartmentId.onChange,
});

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
        .utcOffset(0, true)
        .toISOString(),
      futureCheckingDate: moment(values.futureCheckingDate)
        .utcOffset(0, true)
        .toISOString(),
      bitDepth: Number(values.bitDepth),
      scaleFactor: Number(values.scaleFactor),
      apartmentId: values.apartmentId!,
      mountPlaceId: values.mountPlaceId,
      rateType: values.rateType,
      resource: values.resource!,
      model: values.model,
      isPolling: values.isPolling,
      documentsIds: toArray<Document>(values.documentsIds, false)
        .map((document) => document?.id)
        .filter((documentId): documentId is number => Boolean(documentId)),
      startupReadings:
        values.startupReadings as unknown as BaseIndividualDeviceReadingsCreateRequest,
      defaultReadings:
        values.defaultReadings as unknown as BaseIndividualDeviceReadingsCreateRequest,
    }),
  ),
  clock: confirmCreationNewDeviceButtonClicked,
  target: createIndividualDeviceFx,
});

createIndividualDeviceFx.failData.watch((error) => {
  if (error.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});
