import { createIndividualDevice } from '01/_api/individualDevices';
import { forward, sample } from 'effector';
import { CreateIndividualDeviceRequest } from 'myApi';
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

createIndividualDeviceFx.use(createIndividualDevice);

$creationDeviceStage.on(
  switchStageButtonClicked,
  (_, stageNumber) => stageNumber
);

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
      lastCheckingDate: values.lastCheckingDate,
      futureCheckingDate: values.futureCheckingDate,
      lastCommercialAccountingDate: values.lastCommercialAccountingDate,
      bitDepth: Number(values.bitDepth),
      scaleFactor: Number(values.scaleFactor),
      apartmentId: values.apartmentId!,
      mountPlaceId: values.mountPlaceId,
      rateType: '1',
      resource: values.resource!,
      model: values.model,
    })
  ),
  clock: confirmCreationNewDeviceButtonClicked,
  target: createIndividualDeviceFx,
});
