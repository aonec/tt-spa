import { createDomain, forward, guard, sample } from 'effector';

const domain = createDomain('apartmentsGroupService');

const apartmentId = domain.createStore<number | null>(null);
const setApartmentId = domain.createEvent<number | null>();

const clearPageY = domain.createEvent();

apartmentId.on(setApartmentId, (_, y) => y).reset(clearPageY);

export const apartmentsGroupService = {
  inputs: { setApartmentId },
  outputs: { apartmentId },
  gates: {},
};
