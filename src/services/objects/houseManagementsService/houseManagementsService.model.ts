import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import {
  CreateHouseManagementRequest,
  HouseManagementResponse,
} from 'api/types';
import {
  createHouseManagement,
  getHouseManagements,
} from './houseManagementsService.api';
import { GetHouseManagementsRequestPayload } from './houseManagementsService.types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { updateHouseManagementService } from '../updateHouseManagement/updateHouseManagementService.models';

const HouseManagementsGate = createGate<GetHouseManagementsRequestPayload>();

const handleCreateHouseManagement = createEvent<CreateHouseManagementRequest>();

const successUpdateHouseManagement =
  updateHouseManagementService.inputs.successUpdateHouseManagement;

const handleOpenModal = createEvent();

const handleCloseModal = createEvent();

const fetchHouseManagementFx = createEffect<
  GetHouseManagementsRequestPayload,
  HouseManagementResponse[]
>(getHouseManagements);

const createHouseManagementFx = createEffect<
  CreateHouseManagementRequest,
  HouseManagementResponse | null,
  EffectFailDataAxiosError
>(createHouseManagement);

const $houseManagements = createStore<HouseManagementResponse[] | null>(null)
  .on(fetchHouseManagementFx.doneData, (_, list) => list)
  .on(createHouseManagementFx.doneData, (prev, data) => {
    return data ? [data, ...(prev || [])] : prev;
  })
  .on(successUpdateHouseManagement, (prev, data) => {
    const index = prev?.findIndex((item) => item.id === data?.id);

    if (data) {
      return prev?.map((item, i) => (i === index ? data : item));
    }
    return prev;
  });

const $housingStockId = createStore<number | null>(null)
  .on(handleOpenModal, (_, data) => data)
  .reset(handleCloseModal);

sample({
  source: $houseManagements,
  clock: HouseManagementsGate.state,
  filter: (houseManagements) => !houseManagements,
  fn: (_, payload) => payload,
  target: fetchHouseManagementFx,
});

sample({
  clock: handleCreateHouseManagement,
  source: $housingStockId,
  fn: (source, clock) =>
    ({
      housingStockId: Number(source),
      name: clock.name,
    }) as CreateHouseManagementRequest,
  target: createHouseManagementFx,
});

const $isHouseManagementsLoading = createHouseManagementFx.pending;

const handleHouseManagementCreated = createHouseManagementFx.doneData;

const $isModalOpen = createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false)
  .reset(handleHouseManagementCreated);

createHouseManagementFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

export const houseManagementsService = {
  inputs: {
    handleOpenModal,
    handleCloseModal,
    handleCreateHouseManagement,
    handleHouseManagementCreated,
  },
  outputs: {
    $houseManagements,
    $isModalOpen,
    $isHouseManagementsLoading,
  },
  gates: {
    HouseManagementsGate,
  },
};
