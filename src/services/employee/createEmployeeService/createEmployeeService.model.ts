import { createDomain, forward } from 'effector';
import { competencesService } from '../competencesService';
import { rolesService } from '../rolesService';
import { addStaff } from './createEmployeeService.api';
import {
  OrganizationUserCreateRequest,
  OrganizationUserResponse,
} from 'api/myApi';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const domain = createDomain('createEmployeeService');

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const handleCreateEmloyee = domain.createEvent<OrganizationUserCreateRequest>();

const createEmloyeeFx = domain.createEffect<
  OrganizationUserCreateRequest,
  OrganizationUserResponse,
  EffectFailDataAxiosError
>(addStaff);

const createEmloyeeSuccess = createEmloyeeFx.doneData;

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false)
  .reset(createEmloyeeSuccess);

forward({ from: handleCreateEmloyee, to: createEmloyeeFx });

const $isLoading = createEmloyeeFx.pending;

createEmloyeeFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

createEmloyeeSuccess.watch((newUserData) => {
  message.success('Сотрудник успешно добавлен!');

  setTimeout(() => {
    message.destroy();
    message.info(
      `Cсылка на регистрацию отправлена на почту ${newUserData.email || ''}`,
    );
  }, 2000);
});

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
    $isLoading,
  },
  gates: {
    CompetencesGate: competencesService.gates.CompetencesGate,
    UserRolesGate: rolesService.gates.UserRolesGate,
  },
};
