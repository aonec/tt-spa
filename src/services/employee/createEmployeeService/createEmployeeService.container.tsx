import React from 'react';
import { createEmployeeService } from './createEmployeeService.model';
import { useUnit } from 'effector-react';
import { CreateEmployeeModal } from './view/CreateEmployeeModal';

const { inputs, outputs, gates } = createEmployeeService;
const { CompetencesGate, UserRolesGate } = gates;

export const CreateEmployeeContainer = () => {
  const {
    competences,
    handleCloseModal,
    handleCreateEmloyee,
    isLoading,
    isModalOpen,
    userRoles,
  } = useUnit({
    isModalOpen: outputs.$isModalOpen,
    isLoading: outputs.$isLoading,
    competences: outputs.$competencesCatalog,
    userRoles: outputs.$userRoles,
    handleCloseModal: inputs.handleCloseModal,
    handleCreateEmloyee: inputs.handleCreateEmloyee,
  });

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
        handleCreateEmloyee={handleCreateEmloyee}
        isLoading={isLoading}
      />
    </>
  );
};
