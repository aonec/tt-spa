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

createNodeServiceZoneFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

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
