import { createEvent, createStore } from 'effector';

const setApartmentId = createEvent<number | null>();
const apartmentId = createStore<number | null>(null).on(
  setApartmentId,
  (_, id) => id,
);

export const apartmentsGroupService = {
  inputs: { setApartmentId },
  outputs: { apartmentId },
};
