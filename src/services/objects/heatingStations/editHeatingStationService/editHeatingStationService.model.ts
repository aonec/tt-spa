import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { sample } from 'effector';
import { HeatingStationResponse, UpdateHeatingStationRequest } from 'api/types';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { EffectFailDataAxiosError } from 'types';
import { HeatingStationTypeRequestDictionary } from '../NewHeatingStationForm/newHeatingStationForm.constants';
import { HeatingStation } from '../NewHeatingStationForm/NewHeatingStationForm.types';
import { editHeatingStation } from './editHeatingStationService.api';
import { requestParams } from './editHeatingStationService.types';

const handleEditHeatingStation = createEvent<{
  id: string;
  data: HeatingStation;
}>();

const handleOpenModal = createEvent();
const handleCloseModal = createEvent();

const currentHeatingStatitonDataCapture = createEvent<HeatingStationResponse>();

const editHeatingStationFx = createEffect<
  requestParams,
  HeatingStationResponse | null,
  EffectFailDataAxiosError
>(editHeatingStation);

sample({
  clock: sample({
    clock: handleEditHeatingStation,
    fn: ({ id, data }) => {
      if (!data) return null;
      if (!data.name) return null;
      if (!data.address) return null;
      if (!id) return null;

      const payload: UpdateHeatingStationRequest = {
        name: data.name,
        isThermalChamber: data.isThermalChamber
          ? HeatingStationTypeRequestDictionary[data.isThermalChamber]
          : undefined,
      };

      return { id, data: payload };
    },
  }),
  filter: (request): request is requestParams => Boolean(request),
  target: editHeatingStationFx,
});

editHeatingStationFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

sample({
  clock: editHeatingStationFx.doneData,
  target: handleCloseModal,
});

const $existingCities = addressSearchService.outputs.$existingCities;
const $existingStreets = addressSearchService.outputs.$existingStreets;

const $isModalOpen = createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false);

const $currentHeatingStation = createStore<HeatingStationResponse | null>(null)
  .on(currentHeatingStatitonDataCapture, (_, id) => id)
  .reset(handleCloseModal);

const handleHeatingStationEdited = editHeatingStationFx.doneData;

export const editHeatingStationService = {
  inputs: {
    handleCloseModal,
    handleOpenModal,
    handleEditHeatingStation,
    handleHeatingStationEdited,
    currentHeatingStatitonDataCapture,
  },
  outputs: {
    $existingCities,
    $existingStreets,
    $isModalOpen,
    $currentHeatingStation,
  },
};
