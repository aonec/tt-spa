import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import { competencesService } from '../competencesService';
import { rolesService } from '../rolesService';
import { addStaff } from './createEmployeeService.api';
import {
  OrganizationUserCreateRequest,
  OrganizationUserResponse,
} from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const handleOpenModal = createEvent();
const handleCloseModal = createEvent();

const handleCreateEmloyee = createEvent<OrganizationUserCreateRequest>();

const createEmloyeeFx = createEffect<
  OrganizationUserCreateRequest,
  OrganizationUserResponse,
  EffectFailDataAxiosError
>(addStaff);

const createEmloyeeSuccess = createEmloyeeFx.doneData;

const $isModalOpen = createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false)
  .reset(createEmloyeeSuccess);

sample({ clock: handleCreateEmloyee, target: createEmloyeeFx });

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
