import { combine, sample } from 'effector';
import { completeStage, correctionReadingsForm } from '.';
import { $nextStages } from '../../displayNextStages/models';
import { $task } from '../../displayTask/models';
import { pushStageFx } from '../../pushingStage/models';

sample({
  source: combine(
    $task,
    correctionReadingsForm.$values,
    $nextStages,
    (task, { needSeniorOperatorCheck, comment, readingValue }, nextStages) => {
      const device = task?.individualDevice;
      const reading = device?.readings && device?.readings[0];

      const finalStage = nextStages?.find((elem) => elem.type === 'Final');
      const switchStage = nextStages?.find((elem) => elem.type === 'Switch');

      const payloadForFinal = {
        fixedReading: {
          ...readingValue,
          deviceId: device?.id,
          readingDate: reading?.readingDate,
          uploadTime: reading?.readingDateTime,
        },
        nextStagesId: finalStage?.id,
      };

      const payloadForEtraCheck = {
        comment,
        nextStageId: switchStage?.id,
      };

      return {
        taskId: task?.id!,
        data: needSeniorOperatorCheck ? payloadForEtraCheck : payloadForFinal,
      };
    }
  ),
  clock: completeStage,
  target: pushStageFx as any,
});
