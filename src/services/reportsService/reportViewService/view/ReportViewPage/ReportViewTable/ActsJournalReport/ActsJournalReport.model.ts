import {
  $actTypes,
  ApartmentActTypesGate,
} from '01/features/actsJournal/displayActTypes/models';

export const actsJournalReportService = {
  outputs: { $actTypes },
  gates: { ApartmentActTypesGate },
};
