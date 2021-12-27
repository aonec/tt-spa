import { getTask } from '01/_api/tasks';
import { forward, guard } from 'effector';
import { $task, fetchTaskFx, refetchTask, TaskGate } from '.';

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
