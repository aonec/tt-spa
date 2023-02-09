import { createDomain, forward } from 'effector';
import { competencesService } from '../competencesService';
import { rolesService } from '../rolesService';
import { addStaff } from './createEmployeeService.api';
import { OrganizationUserCreateRequest, OrganizationUserResponse } from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const domain = createDomain('createEmployeeService');

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const handleCreateEmloyee = domain.createEvent<OrganizationUserCreateRequest>();

const createEmloyeeFx = domain.createEffect<
  OrganizationUserCreateRequest,
  Promise<OrganizationUserResponse>,
  EffectFailDataAxiosError
>(addStaff);

const createEmloyeeSuccess = createEmloyeeFx.doneData;

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false)
  .reset(createEmloyeeSuccess);

forward({ from: handleCreateEmloyee, to: createEmloyeeFx });

createEmloyeeFx.failData.watch((error) =>
  message.error(error.response.data.error.Text)
);

createEmloyeeSuccess.watch(() =>
  message.success('Сотрудник успешно добавлен!')
);

export const createEmployeeService = {
  inputs: {
    handleOpenModal,
    handleCloseModal,
    handleCreateEmloyee,
    createEmloyeeSuccess,
  },
  outputs: {
    $isModalOpen,
    $competencesCatalog: competencesService.outputs.$competencesCatalog,
    $userRoles: rolesService.outputs.$userRoles,
  },
  gates: {
    CompetencesGate: competencesService.gates.CompetencesGate,
    UserRolesGate: rolesService.gates.UserRolesGate,
  },
};
