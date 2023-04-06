import { createDomain, forward } from 'effector';
import { editEmployee } from './editEmployeeService.api';
import { OrganizationUserResponse, OrganizationUserUpdateRequest } from 'myApi';
import { competencesService } from '../competencesService';
import { rolesService } from '../rolesService';
import { employeeProfileService } from 'services/employee/employeeProfileService';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

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
  OrganizationUserResponse | null,
  EffectFailDataAxiosError
>(editEmployee);

forward({ from: handleSubmit, to: updateEmployeeFx });

const $pending = updateEmployeeFx.pending;

updateEmployeeFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

updateEmployeeFx.doneData.watch(() =>
  message.success('Информация успешно обновлена!'),
);

export const editEmployeeService = {
  inputs: { handleSubmit },
  outputs: {
    $pending,
    $competencesCatalog: competencesService.outputs.$competencesCatalog,
    $userRoles: rolesService.outputs.$userRoles,
    $employeeData: employeeProfileService.outputs.$userData,
    $employeeDataPending: employeeProfileService.outputs.$employeeDataPending,
  },
  gates: {
    CompetencesGate: competencesService.gates.CompetencesGate,
    UserRolesGate: rolesService.gates.UserRolesGate,
    FetchEmployeeDataGate: employeeProfileService.gates.FetchUserDataGate,
  },
};
