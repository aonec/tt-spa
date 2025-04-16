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

const HouseManagementsGate = createGate<GetHouseManagementsRequestPayload>();

const handleCreateHouseManagement = createEvent<CreateHouseManagementRequest>();

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

const $houseManagements = createStore<HouseManagementResponse[] | null>(
  null,
).on(fetchHouseManagementFx.doneData, (_, list) => list);

const $isModalOpen = createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false);

sample({
  source: $houseManagements,
  clock: HouseManagementsGate.state,
  filter: (houseManagements) => !houseManagements,
  fn: (_, payload) => payload,
  target: fetchHouseManagementFx,
});

sample({
  clock: handleCreateHouseManagement,
  target: createHouseManagementFx,
});

createHouseManagementFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

export const houseManagementsService = {
  inputs: { handleOpenModal, handleCloseModal, handleCreateHouseManagement },
  outputs: {
    $houseManagements,
    $isModalOpen,
  },
  gates: {
    HouseManagementsGate,
  },
};
