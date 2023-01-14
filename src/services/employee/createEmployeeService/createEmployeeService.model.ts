import { createDomain } from 'effector';
import { competencesService } from '../competencesService';
import { rolesService } from '../rolesService';

const domain = createDomain('createEmployeeService');

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false);

export const createEmployeeService = {
  inputs: { handleOpenModal, handleCloseModal },
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
