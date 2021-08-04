import { forward, sample } from 'effector';
import {
  $creationDeviceStage,
  $isCheckCreationDeviceFormDataModalOpen,
  addIndividualDeviceForm,
  cancelCheckingButtonClicked,
  checkBeforSavingButtonClicked,
  confirmCreationNewDeviceButtonClicked,
  createIndividualDeviceFx,
  goNextStage,
  switchStageButtonClicked,
} from './index';

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
