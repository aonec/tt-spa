import { message } from 'antd';
import { createDomain, forward, guard, sample } from 'effector';
import {
  CreateAddressRequest,
  HeatingStationResponse,
  UpdateHeatingStationRequest,
} from 'myApi';
import { addressSearchService } from 'services/addressSearchService/addressSearchService.models';
import { EffectFailDataAxiosError } from 'types';
import { HeatingStationTypeRequestDictionary } from '../NewHeatingStationForm/newHeatingStationForm.constants';
import { HeatingStation } from '../NewHeatingStationForm/NewHeatingStationForm.types';
import { editHeatingStation } from './editHeatingStationService.api';
import { requestParams } from './editHeatingStationService.types';

const domain = createDomain('editHeatingStationService');

const handleEditHeatingStation = domain.createEvent<{
  id: string;
  data: HeatingStation;
}>();

const handleOpenModal = domain.createEvent<void>();
const handleCloseModal = domain.createEvent<void>();

const editHeatingStationFx = domain.createEffect<
  requestParams,
  HeatingStationResponse | null,
  EffectFailDataAxiosError
>(editHeatingStation);

guard({
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

        address: {
          city: data.address.city,
          street: data.address.street,
          number: data.address.number,
        } as CreateAddressRequest,
      };

      return { id, data: payload };
    },
  }),
  filter: (request): request is requestParams => Boolean(request),
  target: editHeatingStationFx,
});

editHeatingStationFx.failData.watch((error) =>
  message.error(error.response.data.error.Text)
);

forward({
  from: editHeatingStationFx.doneData,
  to: handleCloseModal,
});

const $existingCities = addressSearchService.outputs.cities;
const $existingStreets = addressSearchService.outputs.streets;

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false);

const handleHeatingStationEdited = editHeatingStationFx.doneData;

export const editHeatingStationService = {
  inputs: {
    handleCloseModal,
    handleOpenModal,
    handleEditHeatingStation,
    handleHeatingStationEdited,
  },
  outputs: { $existingCities, $existingStreets, $isModalOpen },
};
