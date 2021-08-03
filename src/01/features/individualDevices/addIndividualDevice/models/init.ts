import { $creationDeviceStage, switchStageButtonClicked } from './index';

$creationDeviceStage.on(
  switchStageButtonClicked,
  (_, stageNumber) => stageNumber
);
