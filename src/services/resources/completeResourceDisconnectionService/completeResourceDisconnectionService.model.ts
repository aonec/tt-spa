import { resourceDisablingScheduleServiceService } from '01/features/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleService.model';
import { createDomain, forward, guard, sample } from 'effector';
import { fetchCompleteResourceDisconnecting } from './completeResourceDisconnectionService.api';

const domain = createDomain('completeResourceDisconnectionService');

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

const completeResourceDisconnection = domain.createEvent();
const completeResourceDisconnectionFx = domain.createEffect<string, void>(
  fetchCompleteResourceDisconnecting
);
const $completeResourceDisconnectionIsLoading =
  completeResourceDisconnectionFx.pending;

sample({
  clock: guard({
    source: $resourceDisconnectionId,
    clock: completeResourceDisconnection,
    filter: Boolean,
  }),
  target: completeResourceDisconnectionFx,
});

forward({
  from: completeResourceDisconnectionFx.doneData,
  to: [
    closeModal,
    resourceDisablingScheduleServiceService.inputs
      .refetchResourceDisconnections,
  ],
});

export const completeResourceDisconnectionService = {
  inputs: {
    closeModal,
    openModal,
    completeResourceDisconnection,
  },
  outputs: {
    $completeResourceDisconnectionIsLoading,
    $isModalOpen,
    $endDate,
  },
};
