import { createEvent, createStore, sample } from 'effector';
import { individualSealAssignmentsQuery } from './appointmentsJournalService.api';
import { createGate } from 'effector-react';
import { individualSealControllersQuery } from '../distributeRecordsService/distributeRecordsService.api';
import { FormType } from './AppointmentsJournalPage/AppointmentsJournalPage.types';
import dayjs from 'dayjs';

const AssignmentsJournalGate = createGate();

const setForm = createEvent<FormType>();

const $formValues = createStore<FormType>({
  from: dayjs(),
  to: null,
}).on(setForm, (_, value) => value);

sample({
  clock: [AssignmentsJournalGate.open, $formValues.updates],
  source: $formValues,
  fn: ({ from, to }) => ({
    from: from.format('YYYY-MM-DD'),
    to: to?.format('YYYY-MM-DD'),
  }),
  target: individualSealAssignmentsQuery.start,
});

sample({
  clock: AssignmentsJournalGate.open,
  target: individualSealControllersQuery.start,
});

export const appointmentsJournalService = {
  inputs: { setForm },
  outputs: { $formValues },
  gates: { AssignmentsJournalGate },
};
