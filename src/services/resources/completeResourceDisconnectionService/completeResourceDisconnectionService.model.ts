import { createEffect, createEvent, createStore } from 'effector';
import { resourceDisablingScheduleServiceService } from 'services/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleService.model';
import { message } from 'antd';
import { forward, guard, sample } from 'effector';
import { EffectFailDataAxiosError } from 'types';
import { fetchCompleteResourceDisconnecting } from './completeResourceDisconnectionService.api';

const openModal = createEvent<{ id: string; endDate: string | null }>();
const closeModal = createEvent();

const $resourceDisconnectionId = createStore<string>('')
  .on(openModal, (_, payload) => payload.id)
  .reset(closeModal);

const $endDate = createStore<null | string>(null)
  .on(openModal, (_, payload) => payload.endDate)
  .reset(closeModal);

const $isModalOpen = $resourceDisconnectionId.map(Boolean);

const completeResourceDisconnection = createEvent();

const completeResourceDisconnectionFx = createEffect<
  string,
  void,
  EffectFailDataAxiosError
>(fetchCompleteResourceDisconnecting);

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

completeResourceDisconnectionFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
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
