import { forward, sample } from 'effector';
import { createForm } from 'effector-forms';
import moment from 'moment';
import { individualSealAssignmentsQuery } from './appointmentsJournalService.api';
import { createGate } from 'effector-react';
import { individualSealControllersQuery } from '../distributeRecordsService/distributeRecordsService.api';

const AssignmentsJournalGate = createGate();

const searchForm = createForm({
  fields: {
    from: { init: moment() as moment.Moment },
    to: { init: null as null | moment.Moment },
  },
});

sample({
  clock: [AssignmentsJournalGate.open, searchForm.$values],
  source: searchForm.$values,
  fn: ({ from, to }) => ({
    from: from.format('YYYY-MM-DD'),
    to: to?.format('YYYY-MM-DD'),
  }),
  target: individualSealAssignmentsQuery.start,
});

forward({
  from: AssignmentsJournalGate.open,
  to: individualSealControllersQuery.start,
});

export const appointmentsJournalService = {
  forms: { searchForm },
  gates: { AssignmentsJournalGate },
};