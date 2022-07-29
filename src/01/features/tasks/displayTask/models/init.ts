import { forward, guard } from 'effector';
import { $task, fetchTaskFx, refetchTask, TaskGate } from '.';
import { getTask } from '../../../../_api/tasks';

fetchTaskFx.use(getTask);

$task.on(fetchTaskFx.doneData, (_, task) => task);

forward({
  from: [
    TaskGate.state.map((state) => state.id),
    guard({
      source: $task.map((elem) => elem?.id),
      clock: refetchTask,
      filter: (id) => Boolean(id),
    }) as any,
  ],
  to: fetchTaskFx,
});
