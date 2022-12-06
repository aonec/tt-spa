import { message } from 'antd';
import { createDomain, forward, guard, sample } from 'effector';
import {
  AddHeatingStationRequest,
  CreateAddressRequest,
  HeatingStationResponse,
} from 'myApi';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { EffectFailDataAxiosError } from 'types';
import { HeatingStationTypeRequestDictionary } from '../NewHeatingStationForm/newHeatingStationForm.constants';
import { HeatingStation } from '../NewHeatingStationForm/NewHeatingStationForm.types';
import { postHeatingStation } from './createHeatingStationService.api';

const domain = createDomain('createHeatingStationService');

const handleCreateHeatingStation = domain.createEvent<HeatingStation>();

const handleOpenModal = domain.createEvent<void>();
const handleCloseModal = domain.createEvent<void>();

const createHeatingStationFx = domain.createEffect<
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
  message.error(error.response.data.error.Text)
);

forward({
  from: createHeatingStationFx.doneData,
  to: handleCloseModal,
});

const $existingCities = addressSearchService.outputs.cities;
const $existingStreets = addressSearchService.outputs.streets;

const $isModalOpen = domain
  .createStore<boolean>(false)
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
