import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { forward, guard, sample } from 'effector';
import {
  AddHeatingStationRequest,
  CreateAddressRequest,
  HeatingStationResponse,
} from 'api/types';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { EffectFailDataAxiosError } from 'types';
import { HeatingStationTypeRequestDictionary } from '../NewHeatingStationForm/newHeatingStationForm.constants';
import { HeatingStation } from '../NewHeatingStationForm/NewHeatingStationForm.types';
import { postHeatingStation } from './createHeatingStationService.api';

const handleCreateHeatingStation = createEvent<HeatingStation>();

const handleOpenModal = createEvent();
const handleCloseModal = createEvent();

const createHeatingStationFx = createEffect<
  AddHeatingStationRequest,
  HeatingStationResponse | null,
  EffectFailDataAxiosError
>(postHeatingStation);

guard({
  clock: sample({
    clock: handleCreateHeatingStation,
    fn: (data: HeatingStation) => {
      if (!data) return null;
      if (!data.name) return null;
      if (!data.address) return null;

      const payload: AddHeatingStationRequest = {
        name: data.name,
        isThermalChamber: data.isThermalChamber
          ? HeatingStationTypeRequestDictionary[data.isThermalChamber]
          : undefined,

        address: {
          city: data.address.city,
          street: data.address.street,
          number: data.address.number,
        } as CreateAddressRequest,
      };

      return payload;
    },
  }),
  filter: (data): data is AddHeatingStationRequest => Boolean(data),
  target: createHeatingStationFx,
});

createHeatingStationFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

forward({
  from: createHeatingStationFx.doneData,
  to: handleCloseModal,
});

const $existingCities = addressSearchService.outputs.$existingCities;
const $existingStreets = addressSearchService.outputs.$existingStreets;

const $isModalOpen = createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false);

const handleHeatingStationCreated = createHeatingStationFx.doneData;

export const createHeatingStationService = {
  inputs: {
    handleCreateHeatingStation,
    handleOpenModal,
    handleCloseModal,
    handleHeatingStationCreated,
  },
  outputs: { $isModalOpen, $existingCities, $existingStreets },
  gates: {},
};
