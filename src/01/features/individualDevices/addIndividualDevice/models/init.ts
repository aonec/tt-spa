import { EIndividualDeviceRateType } from './../../../../../myApi';
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

const getIndividualDeviceRateTypeByNum = (num: number) => {
  const values = [
    EIndividualDeviceRateType.OneZone,
    EIndividualDeviceRateType.TwoZone,
    EIndividualDeviceRateType.ThreeZone,
  ];

  return values[num];
};

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
        rateType: getIndividualDeviceRateTypeByNum(
          toArray(values.startupReadings, false).filter(Boolean).length
        ),
        resource: values.resource!,
        model: values.model,
        documentsIds: toArray<FileData>(values.documentsIds, false)
          .filter((elem) => elem?.fileResponse)
          .map((elem) => elem.fileResponse?.id!),
        startupReadings: (values.startupReadings as unknown) as BaseIndividualDeviceReadingsCreateRequest,
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
