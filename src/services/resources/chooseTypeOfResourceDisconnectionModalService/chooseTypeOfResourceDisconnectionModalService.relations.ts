import { forward } from 'effector';
import { createResourceDisconnectionService } from '../createResourceDisconnectionService';
import { chooseTypeOfResourceDisconnectionModalService } from './chooseTypeOfResourceDisconnectionModalService.model';

forward({
  from: chooseTypeOfResourceDisconnectionModalService.inputs.submitModal,
  to: createResourceDisconnectionService.inputs.openModal,
});
