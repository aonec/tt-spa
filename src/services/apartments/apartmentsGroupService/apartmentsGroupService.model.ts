import { createDomain } from 'effector';

const domain = createDomain('apartmentsGroupService');

const apartmentId = domain.createStore<number | null>(null);
const setApartmentId = domain.createEvent<number | null>();

apartmentId.on(setApartmentId, (_, id) => id);

export const apartmentsGroupService = {
  inputs: { setApartmentId },
  outputs: { apartmentId },
};
