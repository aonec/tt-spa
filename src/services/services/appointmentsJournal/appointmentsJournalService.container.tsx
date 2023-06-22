import React from 'react';
import { AppointmentsJournalPage } from './AppointmentsJournalPage';
import { appointmentsJournalService } from './appointmentsJournalService.models';
import { useUnit } from 'effector-react';
import { individualSealAssignmentsQuery } from './appointmentsJournalService.api';

const {
  forms,
  gates: { AssignmentsJournalGate },
} = appointmentsJournalService;

export const AppointmentsJournalContainer = () => {
  const { data: assignmentslist, pending: isLoadingAssygnments } = useUnit(
    individualSealAssignmentsQuery,
  );

  return (
    <>
      <AssignmentsJournalGate />
      <AppointmentsJournalPage
        form={forms.searchForm}
        assignmentslist={assignmentslist}
        isLoadingAssygnments={isLoadingAssygnments}
      />
    </>
  );
};
