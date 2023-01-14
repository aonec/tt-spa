import React from 'react';
import { createEmployeeService } from './createEmployeeService.model';
import { useEvent, useStore } from 'effector-react';
import { CreateEmployeeModal } from './view/CreateEmployeeModal';

const { inputs, outputs, gates } = createEmployeeService;
const { CompetencesGate, UserRolesGate } = gates;

export const CreateEmployeeContainer = () => {
  const isModalOpen = useStore(outputs.$isModalOpen);

  const competences = useStore(outputs.$competencesCatalog);
  const userRoles = useStore(outputs.$userRoles);

  const handleCloseModal = useEvent(inputs.handleCloseModal);

  const multipleSelectionCompetences =
    competences &&
    competences.map((elem) => ({
      label: elem.title,
      value: elem.id,
    }));

  const multipleSelectionUserRoles =
    userRoles &&
    userRoles.map((elem) => ({
      label: elem.value,
      value: elem.key,
    }));

  return (
    <>
      <CompetencesGate />
      <UserRolesGate />
      <CreateEmployeeModal
        isModalOpen={isModalOpen}
        handleCloseModal={() => handleCloseModal()}
        multipleSelectionCompetences={multipleSelectionCompetences}
        multipleSelectionUserRoles={multipleSelectionUserRoles}
      />
    </>
  );
};
