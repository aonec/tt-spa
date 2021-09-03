import {
  checkIndividualDevice,
  switchIndividualDevice,
  CheckIndividualDeviceRequestPayload,
} from './../../../../_api/individualDevices';
import {
  $individualDevice,
  IndividualDeviceGate,
} from './../../displayIndividualDevice/models/index';
import {
  $individualDeviceMountPlaces,
  fetchIndividualDeviceMountPlacesFx,
} from './../../../individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models/index';
import { FileData } from '01/hooks/useFilesUpload';
import { forward, sample, combine, guard } from 'effector';
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

createIndividualDeviceFx.use(checkIndividualDevice);

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
  from: fetchIndividualDevice.doneData.map((values) => {
    return {
      resource: values.resource,
      mountPlaceId: values.deviceMountPlace?.id,
      model: values.model,
      serialNumber: values.serialNumber,
      bitDepth: values.bitDepth,
      scaleFactor: values.scaleFactor,
    } as any;
  }),
  to: addIndividualDeviceForm.setForm,
});

forward({
  from: IndividualDeviceGate.close,
  to: addIndividualDeviceForm.reset,
});

guard({
  source: combine(
    $individualDeviceMountPlaces,
    addIndividualDeviceForm.fields.mountPlaceId.$value,
    (places, name) => {
      const res = places?.find((elem) => elem.name === name)?.id || null;

      return res;
    }
  ),
  filter: (value) => typeof value === 'number',
  clock: fetchIndividualDeviceMountPlacesFx.doneData,
  target: addIndividualDeviceForm.fields.mountPlaceId.set,
});

sample({
  source: combine(
    addIndividualDeviceForm.$values,
    $individualDevice,
    (values, device) => ({ values, device })
  ).map(
    ({ values, device }): CheckIndividualDeviceRequestPayload => ({
      device: {
        deviceId: device?.id!,
        futureCheckingDate: values.futureCheckingDate!,
        currentCheckingDate: values.lastCheckingDate!,
        documentsIds: toArray<FileData>(values.documentsIds, false)
          .filter((elem) => elem?.fileResponse)
          .map((elem) => elem.fileResponse?.id!),
        newDeviceStartupReadings: (values.startupReadings as unknown) as BaseIndividualDeviceReadingsCreateRequest,
        newDeviceDefaultReadings: (values.defaultReadings as unknown) as BaseIndividualDeviceReadingsCreateRequest,
        previousDeviceFinishingReadings: (values.previousDeviceFinishingReadings as unknown) as BaseIndividualDeviceReadingsCreateRequest,
        contractorId: values.contractorId,
      },
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
