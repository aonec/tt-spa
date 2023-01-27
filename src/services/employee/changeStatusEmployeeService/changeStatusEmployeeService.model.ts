import { createDomain, forward } from 'effector';
import { postEmloyeeStatus } from './changeStatusEmployeeService.api';
import {
  AddOrganizationUserWorkingStatusRequest,
  OrganizationUserWorkingStatusResponse,
  UserStatusResponse,
} from 'myApi';
import { message } from 'antd';
import { EffectFailDataAxiosError } from 'types';

const domain = createDomain('changeStatusEmployeeService');

const handleOpenModal = domain.createEvent();
const handleCloseModal = domain.createEvent();

const handleCatchEmployeeStatusData = domain.createEvent<{
  id: number;
  status: UserStatusResponse | null;
}>();

const handleUpdateStatus =
  domain.createEvent<AddOrganizationUserWorkingStatusRequest>();

const updateStatusFx = domain.createEffect<
  AddOrganizationUserWorkingStatusRequest,
  OrganizationUserWorkingStatusResponse | null,
  EffectFailDataAxiosError
>(postEmloyeeStatus);

const successUpdateStatus = updateStatusFx.doneData;

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleOpenModal, () => true)
  .on(handleCloseModal, () => false);

const $employeeStatus = domain
  .createStore<{ id: number; status: UserStatusResponse | null } | null>(null)
  .on(handleCatchEmployeeStatusData, (_, data) => data);

forward({
  from: handleUpdateStatus,
  to: updateStatusFx,
});

updateStatusFx.failData.watch((error) =>
  message.error(error.response.data.error.Text),
);

successUpdateStatus.watch(() => message.success('Статус изменен!'));

export const changeStatusEmployeeService = {
  inputs: {
    handleOpenModal,
    handleCloseModal,
    handleUpdateStatus,
    handleCatchEmployeeStatusData,
    successUpdateStatus,
  },
  outputs: { $isModalOpen, $employeeStatus },
};
