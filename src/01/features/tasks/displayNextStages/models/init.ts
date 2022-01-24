import { getNextStages } from '01/_api/tasks';
import { forward } from 'effector';
import { $nextStages, fetchNextStagesFx, NextStagesGate } from '.';

fetchNextStagesFx.use(getNextStages);

$nextStages.on(fetchNextStagesFx.doneData, (_, stages) => stages);

forward({
  from: NextStagesGate.state.map(({ taskId }) => taskId),
  to: fetchNextStagesFx,
});
