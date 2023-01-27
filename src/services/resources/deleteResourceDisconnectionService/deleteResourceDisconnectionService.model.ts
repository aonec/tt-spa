import { resourceDisablingScheduleServiceService } from '01/features/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleService.model';
import { createDomain, forward, guard, sample } from 'effector';
import { fetchDeleteResourceDisconnecting } from './deleteResourceDisconnectionService.api';

const domain = createDomain('deleteResourceDisconnectionService');

const openModal = domain.createEvent<{ id: string; endDate: string }>();
const closeModal = domain.createEvent();

const $resourceDisconnectionId = domain
  .createStore<string>('')
  .on(openModal, (_, payload) => payload.id)
  .reset(closeModal);

const $endDate = domain
  .createStore('')
  .on(openModal, (_, payload) => payload.endDate)
  .reset(closeModal);

const $isModalOpen = $resourceDisconnectionId.map(Boolean);

const deleteResourceDisconnection = domain.createEvent();
const deleteResourceDisconnectionFx = domain.createEffect<string, void>(
  fetchDeleteResourceDisconnecting,
);
const $deleteResourceDisconnectionIsLoading =
  deleteResourceDisconnectionFx.pending;

sample({
  clock: guard({
    source: $resourceDisconnectionId,
    clock: deleteResourceDisconnection,
    filter: Boolean,
  }),
  target: deleteResourceDisconnectionFx,
});

forward({
  from: deleteResourceDisconnectionFx.doneData,
  to: [
    closeModal,
    resourceDisablingScheduleServiceService.inputs
      .refetchResourceDisconnections,
  ],
});

export const deleteResourceDisconnectionService = {
  inputs: {
    closeModal,
    openModal,
    deleteResourceDisconnection,
  },
  outputs: {
    $deleteResourceDisconnectionIsLoading,
    $isModalOpen,
    $endDate,
  },
};
