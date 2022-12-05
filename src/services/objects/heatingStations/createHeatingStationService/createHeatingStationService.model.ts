import { message } from 'antd';
import { createDomain, guard, sample } from 'effector';
import { AddHeatingStationRequest, HeatingStationResponse } from 'myApi';
import { HeatingStationTypeRequestDictionary } from '../NewHeatingStationForm/newHeatingStationForm.constants';
import { HeatingStation } from '../NewHeatingStationForm/NewHeatingStationForm.types';
import { postHeatingStation } from './createHeatingStationService.api';

const domain = createDomain('createHeatingStationService');

const handleCreateHeatingStation = domain.createEvent<HeatingStation>();

const handleOpenModal = domain.createEvent<void>();
const handleCloseModal = domain.createEvent<void>();

const createHeatingStationFx = domain.createEffect<
  AddHeatingStationRequest,
  HeatingStationResponse | null
>(postHeatingStation);

guard({
  clock: sample({
    clock: handleCreateHeatingStation,
    fn: (data: HeatingStation) => {
      if (!data) return null;
      if (!data.name) return null;

      const payload: AddHeatingStationRequest = {
        name: data.name,
        isThermalChamber: data.isThermalChamber
          ? HeatingStationTypeRequestDictionary[data.isThermalChamber]
          : undefined,
      };

      return payload;
    },
  }),
  filter: (data): data is AddHeatingStationRequest => Boolean(data),
  target: createHeatingStationFx,
});

createHeatingStationFx.failData.watch((error) => message.error(error.name));

const $newHeatingStation = domain
  .createStore<HeatingStationResponse | null>(null)
  .on(createHeatingStationFx.doneData, (_, data) => data);

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false);

export const createHeatingStationService = {
  inputs: { handleCreateHeatingStation, handleOpenModal, handleCloseModal },
  outputs: { $isModalOpen },
  gates: {},
};
