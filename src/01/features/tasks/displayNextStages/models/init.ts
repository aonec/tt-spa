import { forward } from 'effector';
import { $nextStages, fetchNextStagesFx, NextStagesGate } from '.';
import { getNextStages } from '../../../../_api/tasks';

fetchNextStagesFx.use(getNextStages);

$nextStages.on(fetchNextStagesFx.doneData, (_, stages) => stages);

forward({
  from: NextStagesGate.state.map(({ taskId }) => taskId),
  to: fetchNextStagesFx,
});
