import { createDomain, forward } from 'effector';
import { editEmployee } from './editEmployeeService.api';
import { OrganizationUserResponse, OrganizationUserUpdateRequest } from 'myApi';
import { competencesService } from '../competencesService';
import { rolesService } from '../rolesService';

const domain = createDomain('editEmployeeService');

const handleSubmit = domain.createEvent<{
  userId: number;
  form: OrganizationUserUpdateRequest;
}>();

const updateEmployeeFx = domain.createEffect<
  {
    userId: number;
    form: OrganizationUserUpdateRequest;
  },
  OrganizationUserResponse | null
>(editEmployee);

const $pending = updateEmployeeFx.pending;

forward({ from: handleSubmit, to: updateEmployeeFx });

export const editEmployeeService = {
  inputs: { handleSubmit },
  outputs: {
    $pending,
    $competencesCatalog: competencesService.outputs.$competencesCatalog,
    $userRoles: rolesService.outputs.$userRoles,
  },
  gates: {
    CompetencesGate: competencesService.gates.CompetencesGate,
    UserRolesGate: rolesService.gates.UserRolesGate,
  },
};
