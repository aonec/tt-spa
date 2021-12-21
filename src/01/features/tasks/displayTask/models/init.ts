import { getTask } from '01/_api/tasks';
import { forward } from 'effector';
import { $task, fetchTaskFx, TaskGate } from '.';

fetchTaskFx.use(getTask);

$task.on(fetchTaskFx.doneData, (_, task) => task);

forward({
  from: TaskGate.state.map((state) => state.id),
  to: fetchTaskFx,
});
