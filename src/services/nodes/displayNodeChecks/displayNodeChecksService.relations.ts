import { sample } from 'effector';
import { createNodeCheckService } from '../createNodeCheckService';
import { displayNodeChecksService } from './displayNodeChecksService.models';
import { editNodeCheckService } from '../editNodeCheckService';
import { removeNodeCheckService } from '../removeNodeCheckService';

sample({
  clock: [
    createNodeCheckService.inputs.nodeCheckCreated,
    editNodeCheckService.inputs.nodeCheckEdited,
    removeNodeCheckService.inputs.nodeCheckRemoved,
  ],
  target: displayNodeChecksService.inputs.refetchNodeChecks,
});
