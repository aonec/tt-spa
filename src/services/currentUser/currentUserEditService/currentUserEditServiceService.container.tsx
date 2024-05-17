import React from 'react';
import { currentUserEditServiceService } from './currentUserEditServiceService.models';
import { EditUser } from './EditUser';
import { useUnit } from 'effector-react';
import { currentUserService } from '../currentUserService';
import { competencesService } from 'services/employee/competencesService';
import { rolesService } from 'services/employee/rolesService';
import _ from 'lodash';

const { inputs, outputs } = currentUserEditServiceService;

export const CurrentUserEditServiceContainer = () => {
  const {
    user,
    competencesCatalog,
    userChangeableRoles,
    handleEdit,
    isLoading,
  } = useUnit({
    user: currentUserService.outputs.$currentUser,
    competencesCatalog: competencesService.outputs.$competencesCatalog,
    userChangeableRoles: rolesService.outputs.$userRoles,
    handleEdit: inputs.handleEdit,
    isLoading: outputs.isLoading,
  });

  const userCurrentRoles = user?.roles || [];
  const userTotalRoles = [...(userChangeableRoles || []), ...userCurrentRoles]; //смешиваем возможные и текущие роли
  const uniqUserTotalRoles = _.uniqBy(userTotalRoles, 'key'); //удаление дупликатов ролей

  const multipleSelectionCompetences =
    competencesCatalog?.map((elem) => ({
      label: elem.title,
      value: elem.id,
    })) || [];

  const multipleSelectionUserRoles = uniqUserTotalRoles.map((elem) => ({
    label: elem.value || null,
    value: elem.key || null,
  }));

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
