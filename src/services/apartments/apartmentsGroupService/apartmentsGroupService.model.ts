import { createDomain } from 'effector';

const domain = createDomain('apartmentsGroupService');

const setApartmentId = domain.createEvent<number | null>();
const apartmentId = domain
  .createStore<number | null>(null)
  .on(setApartmentId, (_, id) => id);


export const apartmentsGroupService = {
  inputs: { setApartmentId },
  outputs: { apartmentId },
};
