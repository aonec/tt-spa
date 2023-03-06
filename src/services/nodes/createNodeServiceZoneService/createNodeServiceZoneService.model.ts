import { message } from 'antd';
import { createDomain, forward } from 'effector';
import { NodeServiceZoneRequest, NodeServiceZoneResponse } from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { postNodeServiceZone } from './createNodeServiceZoneService.api';

const domain = createDomain('createNodeServiceZoneService');

const handleCreateNodeServiceZone =
  domain.createEvent<NodeServiceZoneRequest>();

const createNodeServiceZoneFx = domain.createEffect<
  NodeServiceZoneRequest,
  NodeServiceZoneResponse,
  EffectFailDataAxiosError
>(postNodeServiceZone);

const openCreateNodeServiceZoneModal = domain.createEvent();

const closeCreateNodeServiceZoneModal = domain.createEvent();

const $isModalOpen = domain
  .createStore(false)
  .on(openCreateNodeServiceZoneModal, () => true)
  .reset(closeCreateNodeServiceZoneModal);

forward({
  from: handleCreateNodeServiceZone,
  to: createNodeServiceZoneFx,
});

forward({
  from: createNodeServiceZoneFx.doneData,
  to: closeCreateNodeServiceZoneModal,
});

const $isLoading = createNodeServiceZoneFx.pending;

const handleServiceZoneCreated = createNodeServiceZoneFx.doneData;

createNodeServiceZoneFx.doneData.watch(() =>
  message.success('Новая зона добавлена'),
);

createNodeServiceZoneFx.failData.watch((error) => {
  if (error.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }
  return message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

export const createNodeServiceZoneService = {
  inputs: {
    handleCreateNodeServiceZone,
    openCreateNodeServiceZoneModal,
    closeCreateNodeServiceZoneModal,
    handleServiceZoneCreated,
    createNodeServiceZoneFx,
  },
  outputs: {
    $isLoading,
    $isModalOpen,
  },
};
