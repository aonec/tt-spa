import { refetchStaff } from './../../../displayStaff/models/index';
import { putManagingFirmUser } from './../../../../../_api/staff';
import { sample, combine, forward } from 'effector';
import {
  $managingFirmUser,
  fetchManagingFirmUserFx,
} from '../../displayManagingFirmUser/models';
import {
  editManagingUserInfoForm,
  editManagingUserInfoFx,
  $isUpdateManagingFirmUserSuccess,
  resetEditManagingUserRequest,
  EditManagingFirmUserGate,
} from './index';
import { ManagingFirmUserResponse, ManagingFirmUserUpdateRequest } from 'myApi';

const mutateUserToEditUserFormValues = (user: ManagingFirmUserResponse) => ({
  email: user?.email,
  firstName: user?.firstName,
  lastName: user?.lastName,
  middleName: user?.middleName,
  cellphone: user?.cellphone,
  userRoleIds: user?.userRoles?.map((elem) => elem.id),
  firmCompetenceIds: user?.competences?.map((elem) => elem.id),
});

editManagingUserInfoFx.use(putManagingFirmUser);

$isUpdateManagingFirmUserSuccess
  .on(editManagingUserInfoFx.doneData, () => true)
  .reset(editManagingUserInfoFx.failData, resetEditManagingUserRequest);

forward({
  from: editManagingUserInfoFx.doneData,
  to: refetchStaff,
});

forward({
  from: EditManagingFirmUserGate.close,
  to: editManagingUserInfoForm.resetValues,
});

sample({
  source: $managingFirmUser.map((user) =>
    mutateUserToEditUserFormValues(user!)
  ),
  clock: EditManagingFirmUserGate.open,
  target: editManagingUserInfoForm.setForm,
});

sample({
  source: combine(
    editManagingUserInfoForm.$values,
    $managingFirmUser.map((user) => user?.id),
    (values: ManagingFirmUserUpdateRequest, id) => ({ ...values, id })
  ),
  clock: editManagingUserInfoForm.formValidated,
  target: editManagingUserInfoFx as any,
});

forward({
  from: fetchManagingFirmUserFx.doneData.map((user) =>
    mutateUserToEditUserFormValues(user!)
  ),
  to: editManagingUserInfoForm.setForm,
});
