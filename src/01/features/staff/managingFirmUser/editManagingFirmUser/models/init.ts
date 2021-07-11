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
  $isEditingManagingFirmUserInfoRequestFailed,
} from './index';
import { ManagingFirmUserResponse, ManagingFirmUserUpdateRequest } from 'myApi';

const prepareFormData = (user: ManagingFirmUserResponse | null) => ({
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

$isEditingManagingFirmUserInfoRequestFailed
  .on(editManagingUserInfoFx.failData, () => true)
  .reset(editManagingUserInfoFx.doneData, editManagingUserInfoForm.submit);

forward({
  from: editManagingUserInfoFx.doneData,
  to: refetchStaff,
});

forward({
  from: EditManagingFirmUserGate.close,
  to: editManagingUserInfoForm.resetValues,
});

sample({
  source: $managingFirmUser.map((user) => prepareFormData(user)),
  clock: EditManagingFirmUserGate.open,
  target: editManagingUserInfoForm.setForm,
});

forward({
  from: fetchManagingFirmUserFx.doneData.map((user) => prepareFormData(user)),
  to: editManagingUserInfoForm.setForm,
});

sample({
  source: combine(
    editManagingUserInfoForm.$values,
    $managingFirmUser.map((user) => user?.id),
    (values: ManagingFirmUserUpdateRequest, id) => ({ ...values, id }),
  ),
  clock: editManagingUserInfoForm.formValidated,
  target: editManagingUserInfoFx as any,
});
