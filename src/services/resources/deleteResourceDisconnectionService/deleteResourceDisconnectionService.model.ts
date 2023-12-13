import { createEffect, createEvent, createStore } from 'effector';
import { resourceDisablingScheduleServiceService } from 'services/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleService.model';
import { sample } from 'effector';
import { fetchDeleteResourceDisconnecting } from './deleteResourceDisconnectionService.api';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const openModal = createEvent<{ id: string; endDate: string | null }>();
const closeModal = createEvent();

const $resourceDisconnectionId = createStore<string>('')
  .on(openModal, (_, payload) => payload.id)
  .reset(closeModal);

const $endDate = createStore<string | null>(null)
  .on(openModal, (_, payload) => payload.endDate)
  .reset(closeModal);

const $isModalOpen = $resourceDisconnectionId.map(Boolean);

const deleteResourceDisconnection = createEvent();
const deleteResourceDisconnectionFx = createEffect<
  string,
  void,
  EffectFailDataAxiosError
>(fetchDeleteResourceDisconnecting);

const $deleteResourceDisconnectionIsLoading =
  deleteResourceDisconnectionFx.pending;

sample({
  clock: sample({
    source: $resourceDisconnectionId,
    clock: deleteResourceDisconnection,
    filter: Boolean,
  }),
  target: deleteResourceDisconnectionFx,
});

sample({
  clock: deleteResourceDisconnectionFx.doneData,
  target: [
    closeModal,
    resourceDisablingScheduleServiceService.inputs
      .refetchResourceDisconnections,
  ],
});

deleteResourceDisconnectionFx.failData.watch((error) => {
  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
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
