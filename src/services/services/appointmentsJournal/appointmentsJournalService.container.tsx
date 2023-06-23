import React from 'react';
import { AppointmentsJournalPage } from './AppointmentsJournalPage';
import { appointmentsJournalService } from './appointmentsJournalService.models';
import { useUnit } from 'effector-react';
import {
  downloadСontrollerWorkFileQuery,
  individualSealAssignmentsQuery,
} from './appointmentsJournalService.api';
import { individualSealControllersQuery } from '../distributeRecordsService/distributeRecordsService.api';

const {
  forms,
  gates: { AssignmentsJournalGate },
} = appointmentsJournalService;

export const AppointmentsJournalContainer = () => {
  const { data: assignmentslist, pending: isLoadingAssygnments } = useUnit(
    individualSealAssignmentsQuery,
  );

  const { data: controllersList, pending: isLoadingControllers } = useUnit(
    individualSealControllersQuery,
  );

  const { start: downloadWorkFile } = useUnit(downloadСontrollerWorkFileQuery);

  return (
    <>
      <AssignmentsJournalGate />
      <AppointmentsJournalPage
        controllersList={controllersList || []}
        form={forms.searchForm}
        assignmentslist={assignmentslist}
        isLoadingAssygnments={isLoadingAssygnments || isLoadingControllers}
        downloadWorkFile={downloadWorkFile}
      />
    </>
  );
};
