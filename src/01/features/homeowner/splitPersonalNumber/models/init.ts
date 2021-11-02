import {
  $splitPersonalNumberStageNumber,
  setSplitPersonalNumberStage,
} from '.';

$splitPersonalNumberStageNumber.on(
  setSplitPersonalNumberStage,
  (_, value) => value
);
