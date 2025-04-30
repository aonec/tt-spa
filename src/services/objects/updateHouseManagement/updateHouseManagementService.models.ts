import { message } from 'antd';
import { HouseManagementResponse } from 'api/types';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { EffectFailDataAxiosError } from 'types';
import { updateHouseManagement } from './updateHouseManagementService.api';
import { OpenPayload, UpdateType } from './updateHouseManagementService.types';

const handleUpdateHouseManagement = createEvent<UpdateType>();

const handleOpenModal = createEvent<OpenPayload>();
const handleCloseModal = createEvent();

const $initialValues = createStore<OpenPayload | null>(null)
  .on(handleOpenModal, (_, data) => data)
  .reset(handleCloseModal);

const updateHouseManagementFx = createEffect<
  UpdateType,
  HouseManagementResponse | null,
  EffectFailDataAxiosError
>(updateHouseManagement);

sample({
  clock: handleUpdateHouseManagement,
  target: updateHouseManagementFx,
});

updateHouseManagementFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

const successUpdateHouseManagement = updateHouseManagementFx.doneData;

const $isModalOpen = createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false)
  .reset(successUpdateHouseManagement);

export const updateHouseManagementService = {
  inputs: {
    handleOpenModal,
    handleCloseModal,
    handleUpdateHouseManagement,
    successUpdateHouseManagement,
  },
  outputs: { $isModalOpen, $initialValues },
};
