import { pushStages } from '01/_api/tasks';
import { combine, forward, sample } from 'effector';
import {
  completeStage,
  correctionReadingsForm,
  CorrectionReadingsGate,
} from '.';
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
      const device = task?.individualDevice;
      const reading = device?.readings && device?.readings[0];

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
