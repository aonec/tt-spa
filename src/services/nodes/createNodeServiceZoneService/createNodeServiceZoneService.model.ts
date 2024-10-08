import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { sample } from 'effector';
import { NodeServiceZoneRequest, NodeServiceZoneResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { postNodeServiceZone } from './createNodeServiceZoneService.api';

const handleCreateNodeServiceZone = createEvent<NodeServiceZoneRequest>();

const createNodeServiceZoneFx = createEffect<
  NodeServiceZoneRequest,
  NodeServiceZoneResponse,
  EffectFailDataAxiosError
>(postNodeServiceZone);

const openCreateNodeServiceZoneModal = createEvent();

const closeCreateNodeServiceZoneModal = createEvent();

const $isModalOpen = createStore(false)
  .on(openCreateNodeServiceZoneModal, () => true)
  .reset(closeCreateNodeServiceZoneModal);

sample({
  clock: handleCreateNodeServiceZone,
  target: createNodeServiceZoneFx,
});

sample({
  clock: createNodeServiceZoneFx.doneData,
  target: closeCreateNodeServiceZoneModal,
});

const $isLoading = createNodeServiceZoneFx.pending;

const handleServiceZoneCreated = createNodeServiceZoneFx.doneData;

createNodeServiceZoneFx.doneData.watch(() =>
  message.success('Новая зона добавлена'),
);

createNodeServiceZoneFx.failData.watch((error) => {
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
