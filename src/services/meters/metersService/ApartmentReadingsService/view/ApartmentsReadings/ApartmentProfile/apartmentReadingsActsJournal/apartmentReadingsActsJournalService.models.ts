import { sample } from 'effector';
import { createGate } from 'effector-react';
import { apartmentActsListQuery } from './apartmentReadingsActsJournalService.api';

const ApartmentActsGate = createGate<{ id: number }>();

sample({
  clock: ApartmentActsGate.open,
  fn: ({ id }) => ({ ApartmentId: id, PageNumber: 1, PageSize: 3 }),
  target: apartmentActsListQuery.start,
});

export const apartmentReadingsActsJournalService = {
  gates: { ApartmentActsGate },
};
