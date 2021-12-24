import { combine, sample } from 'effector';
import { completeStage, correctionReadingsForm } from '.';
import { $task } from '../../displayTask/models';
import { pushStageFx } from '../../pushingStage/models';

sample({
  source: combine($task, correctionReadingsForm.$values, (task, form) => {
    return {
      taskId: task?.id!,
      data: {},
    };
  }),
  clock: completeStage,
  target: pushStageFx,
});
