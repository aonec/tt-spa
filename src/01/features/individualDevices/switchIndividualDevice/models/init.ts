import { IndividualDeviceGate } from './../../displayIndividualDevice/models/index';
import {
  $individualDeviceMountPlaces,
  fetchIndividualDeviceMountPlacesFx,
} from './../../../individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models/index';
import { FileData } from '01/hooks/useFilesUpload';
import {
  CreateCreateIndividualDeviceWithMagnetSealRequest,
  createIndividualDevice,
} from '01/_api/individualDevices';
import { forward, sample, combine } from 'effector';
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
import { fetchIndividualDevice } from '../../displayIndividualDevice/models';

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

forward({
  from: fetchIndividualDevice.doneData.map(
    (values) =>
      ({ resource: values.resource, mountPlaceId: values.mountPlace } as any)
  ),
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
  clock: fetchIndividualDeviceMountPlacesFx.doneData,
  target: addIndividualDeviceForm.fields.mountPlaceId.set,
});

sample({
  source: addIndividualDeviceForm.$values.map(
    (values): CreateCreateIndividualDeviceWithMagnetSealRequest => ({
      device: {
        serialNumber: values.serialNumber,
        lastCheckingDate: values.lastCheckingDate,
        futureCheckingDate: values.futureCheckingDate,
        lastCommercialAccountingDate: values.lastCommercialAccountingDate,
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
      } as any,
      magnetSeal: {
        isInstalled: values.isInstalled,
        magneticSealInstallationDate: values.magneticSealInstallationDate,
        magneticSealTypeName: values.magneticSealTypeName,
      },
    })
  ),
  clock: confirmCreationNewDeviceButtonClicked,
  target: createIndividualDeviceFx,
});
