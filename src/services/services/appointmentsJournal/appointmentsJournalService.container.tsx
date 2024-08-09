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
  inputs,
  outputs,
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

  const { setForm, formValues } = useUnit({
    setForm: inputs.setForm,
    formValues: outputs.$formValues,
  });

  return (
    <>
      <AssignmentsJournalGate />
      <AppointmentsJournalPage
        controllersList={controllersList || []}
        assignmentslist={assignmentslist}
        isLoadingAssygnments={isLoadingAssygnments || isLoadingControllers}
        downloadWorkFile={downloadWorkFile}
        setForm={setForm}
        formValues={formValues}
      />
    </>
  );
};
