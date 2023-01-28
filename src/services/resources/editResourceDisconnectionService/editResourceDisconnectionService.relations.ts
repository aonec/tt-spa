import { resourceDisablingScheduleServiceService } from '01/features/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleService.model';
import { forward } from 'effector';
import { createResourceDisconnectionService } from '../createResourceDisconnectionService';
import { editResourceDisconnectionService } from './editResourceDisconnectionService.model';

forward({
  from: createResourceDisconnectionService.inputs.closeModal,
  to: [
    editResourceDisconnectionService.inputs.clearDisconnectionId,
    editResourceDisconnectionService.inputs.clearResourceDisconnection,
  ],
});

forward({
  from: editResourceDisconnectionService.inputs.editResourceDisconnectionFx.doneData,
  to: [
    createResourceDisconnectionService.inputs.closeModal,
    resourceDisablingScheduleServiceService.inputs
      .refetchResourceDisconnections,
  ],
});
