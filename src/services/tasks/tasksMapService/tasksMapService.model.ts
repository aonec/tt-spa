import { tasksProfileService } from '../tasksProfileService';
import {
  $taskTypes,
  TaskTypesGate,
} from '../taskTypesService/taskTypesService.model';

export const tasksMapService = {
  inputs: {},
  outputs: {
    $tasks: tasksProfileService.outputs.$tasksPagedData,
    $taskTypes,
  },
  gates: {
    TaskTypesGate,
  },
};
