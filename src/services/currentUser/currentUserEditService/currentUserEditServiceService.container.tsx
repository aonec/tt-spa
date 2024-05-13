import React from 'react';
import { currentUserEditServiceService } from './currentUserEditServiceService.models';
import { EditUser } from './EditUser';
import { useUnit } from 'effector-react';
import { currentUserService } from '../currentUserService';
import { competencesService } from 'services/employee/competencesService';
import { rolesService } from 'services/employee/rolesService';

const { inputs, outputs } = currentUserEditServiceService;

export const CurrentUserEditServiceContainer = () => {
  const { user, competencesCatalog, userRoles, handleEdit, isLoading } =
    useUnit({
      user: currentUserService.outputs.$currentUser,
      competencesCatalog: competencesService.outputs.$competencesCatalog,
      userRoles: rolesService.outputs.$userRoles,
      handleEdit: inputs.handleEdit,
      isLoading: outputs.isLoading,
    });

  const multipleSelectionCompetences =
    competencesCatalog?.map((elem) => ({
      label: elem.title,
      value: elem.id,
    })) || [];

  const multipleSelectionUserRoles =
    userRoles?.map((elem) => ({
      label: elem.value,
      value: elem.key,
    })) || [];

  return (
    <EditUser
      user={user}
      multipleSelectionCompetences={multipleSelectionCompetences}
      multipleSelectionUserRoles={multipleSelectionUserRoles}
      handleEdit={handleEdit}
      isLoading={isLoading}
    />
  );
};
