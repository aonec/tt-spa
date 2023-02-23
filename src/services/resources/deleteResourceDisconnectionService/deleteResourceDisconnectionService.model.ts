import { resourceDisablingScheduleServiceService } from '01/features/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleService.model';
import { createDomain, forward, guard, sample } from 'effector';
import { fetchDeleteResourceDisconnecting } from './deleteResourceDisconnectionService.api';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

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
const deleteResourceDisconnectionFx = domain.createEffect<
  string,
  void,
  EffectFailDataAxiosError
>(fetchDeleteResourceDisconnecting);
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

deleteResourceDisconnectionFx.failData.watch((error) => {
  if (error.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }
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
