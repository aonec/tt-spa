import { createDomain, guard } from 'effector';
import { deleteManagingFirmUser } from './deleteEmployeeService.api';
import { message } from 'antd';
import { OrganizationUserResponse } from 'api/types';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('deleteEmployeeService');

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const handleCatchEmployeeId = domain.createEvent<number>();

const handleDelete = domain.createEvent();

const deleteEmployeeFx = domain.createEffect<
  number,
  OrganizationUserResponse | null,
  EffectFailDataAxiosError
>(deleteManagingFirmUser);

const successDelete = deleteEmployeeFx.doneData;

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false)
  .reset(successDelete);

const $EmployeeId = domain
  .createStore<number | null>(null)
  .on(handleCatchEmployeeId, (_, id) => id);

guard({
  clock: handleDelete,
  source: $EmployeeId,
  filter: (id): id is number => Boolean(id),
  target: deleteEmployeeFx,
});

deleteEmployeeFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

successDelete.watch(() => message.success('Сотрудник удалён!'));

export const deleteEmployeeService = {
  inputs: {
    handleOpenModal,
    handleCloseModal,
    handleCatchEmployeeId,
    handleDelete,
    successDelete,
  },
  outputs: {
    $isModalOpen,
  },
};
