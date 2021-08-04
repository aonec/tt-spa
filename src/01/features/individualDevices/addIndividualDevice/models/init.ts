import { forward, sample } from 'effector';
import {
  $creationDeviceStage,
  addIndividualDeviceForm,
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
