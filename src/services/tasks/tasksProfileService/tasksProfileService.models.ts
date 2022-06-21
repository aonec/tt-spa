import { createDomain } from 'effector';
import { createGate } from 'effector-react';

const domain = createDomain(
  'tasksProfileService'
);

const searchTasks = domain.createEvent();

const TaskGroupTypeGate = createGate<{grouptype: string}>();

export const tasksProfileService = {
  inputs: {
    searchTasks
  },
  outputs: {

  },
  gates: {
    TaskGroupTypeGate
  }
};
