import { sample } from 'effector';
import {
  $creationDeviceStage,
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
