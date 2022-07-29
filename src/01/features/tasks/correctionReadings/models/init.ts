import { combine, forward, sample } from 'effector';
import {
  completeStage,
  correctionReadingsForm,
  CorrectionReadingsGate,
} from '.';
import { pushStages } from '../../../../_api/tasks';
import { $nextStages } from '../../displayNextStages/models';
import { $task, refetchTask } from '../../displayTask/models';
import { pushStageFx } from '../../pushingStage/models';

pushStageFx.use(pushStages);

sample({
  source: combine(
    $task,
    correctionReadingsForm.$values,
    $nextStages,
    (task, { needSeniorOperatorCheck, comment, readingValue }, nextStages) => {
      if (!task?.individualDevices) return null;

      const device = task?.individualDevices[0];
      const reading = device?.invalidReading;

      const finalStage = nextStages?.find((elem) => elem.type === 'Final');

      const payloadForFinal = {
        fixedReading: {
          ...readingValue,
          deviceId: device?.id,
          readingDate: reading?.readingDate,
          uploadTime: reading?.readingDateTime,
        },
      };

      const payloadForEtraCheck = {
        nextStageId: finalStage?.id,
        comment,
        fixedReading: {
          ...readingValue,
          deviceId: device?.id,
          readingDate: reading?.readingDate,
          uploadTime: reading?.readingDateTime,
        }
      };

      return {
        taskId: task?.id!,
        payload: needSeniorOperatorCheck
          ? payloadForEtraCheck
          : payloadForFinal,
      };
    }
  ),
  clock: completeStage,
  target: pushStageFx as any,
});

forward({
  from: CorrectionReadingsGate.close,
  to: correctionReadingsForm.reset,
});

forward({
  from: pushStageFx.doneData,
  to: refetchTask,
});
