import { sample } from 'effector';
import { createResourceDisconnectionService } from '../createResourceDisconnectionService';
import { chooseTypeOfResourceDisconnectionModalService } from './chooseTypeOfResourceDisconnectionModalService.model';

sample({
  clock: chooseTypeOfResourceDisconnectionModalService.inputs.submitModal,
  target: createResourceDisconnectionService.inputs.openModal,
});
