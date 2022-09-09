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
import { OrganizationUserResponse, OrganizationUserUpdateRequest } from 'myApi';

const prepareFormData = (user: OrganizationUserResponse | null) => ({
  email: user?.email,
  firstName: user?.firstName,
  lastName: user?.lastName,
  middleName: user?.middleName,
  cellphone: user?.cellphone,
  roleTypes: user?.roles?.map((elem) => elem.key),
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
    (values: OrganizationUserUpdateRequest, id) => ({ ...values, id })
  ),
  clock: editManagingUserInfoForm.formValidated,
  target: editManagingUserInfoFx as any,
});
