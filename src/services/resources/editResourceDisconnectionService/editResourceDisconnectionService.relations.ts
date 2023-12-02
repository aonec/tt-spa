import { resourceDisablingScheduleServiceService } from 'services/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleService.model';
import { sample } from 'effector';
import { createResourceDisconnectionService } from '../createResourceDisconnectionService';
import { editResourceDisconnectionService } from './editResourceDisconnectionService.model';

sample({
  clock: createResourceDisconnectionService.inputs.closeModal,
  target: [
    editResourceDisconnectionService.inputs.clearDisconnectionId,
    editResourceDisconnectionService.inputs.clearResourceDisconnection,
  ],
});

sample({
  clock:
    editResourceDisconnectionService.inputs.editResourceDisconnectionFx
      .doneData,
  target: [
    createResourceDisconnectionService.inputs.closeModal,
    resourceDisablingScheduleServiceService.inputs
      .refetchResourceDisconnections,
  ],
});
