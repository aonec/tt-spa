import React from 'react';
import { EditEmployee } from './view/EditEmployee';
import { editEmployeeService } from './editEmployeeService.model';
import { useEvent, useStore } from 'effector-react';

const { inputs, outputs, gates } = editEmployeeService;
const { CompetencesGate, UserRolesGate } = gates;

export const EditEmployeeContainer = () => {
  const isPending = useStore(outputs.$pending);
  const competences = useStore(outputs.$competencesCatalog);
  const userRoles = useStore(outputs.$userRoles);

  const handleSubmit = useEvent(inputs.handleSubmit);

  const multipleSelectionCompetences = competences?.map((elem) => ({
    label: elem.title,
    value: elem.id,
  }));

  const multipleSelectionUserRoles = userRoles?.map((elem) => ({
    label: elem.value,
    value: elem.key,
  }));

  return (
    <>
      <CompetencesGate />
      <UserRolesGate />
      <EditEmployee
        isPending={isPending}
        onSubmit={handleSubmit}
        multipleSelectionCompetences={multipleSelectionCompetences}
        multipleSelectionUserRoles={multipleSelectionUserRoles}
      />
    </>
  );
};
