import {
  $addPersonalNumberRequestStatus,
  $isForced,
  addPersonalNmberSaveButtonClicked,
  handleAddPersonalNumber,
  handleConfirmationModalClose,
  onForced,
  setAddPersonalNumberStatus,
} from './index';
import { addHomeowner } from './../../../../_api/homeowners';
import { addPersonalNumberFx } from '.';
import { combine, forward, sample } from 'effector';
import { personalNumberEditForm } from '../../editPersonalNumber/models';
import { $apartment } from '01/features/apartments/displayApartment/models';
import { HomeownerAccountCreateRequest } from 'myApi';
import {
  PersonalNumberFormMountPlaceType,
  PersonalNumberFormTypeGate,
} from '../../editPersonalNumber/components/PersonalNumberEditForm/personalNumberEditForm.controller';
import { message } from 'antd';

addPersonalNumberFx.use(addHomeowner);

forward({
  from: addPersonalNmberSaveButtonClicked,
  to: personalNumberEditForm.submit,
});

sample({
  clock: personalNumberEditForm.formValidated,
  source: PersonalNumberFormTypeGate.state,
  filter: (formType) => formType.type === PersonalNumberFormMountPlaceType.Add,
  fn: (source) => source.type,
  target: handleAddPersonalNumber,
});

sample({
  clock: handleAddPersonalNumber,
  source: combine(
    personalNumberEditForm.$values,
    $apartment,
    $isForced,
    (
      {
        personalAccountNumber,
        name,
        phoneNumber,
        openAt,
        isMainAccountingNumber,
      },
      apartment,
      isForced,
    ) => {
      const data: HomeownerAccountCreateRequest = {
        name,
        phoneNumber,
        openAt: String(openAt),
        personalAccountNumber: personalAccountNumber!,
        apartmentId: apartment?.id!,
        isMainOnApartment: isMainAccountingNumber,
        isForced: isForced,
      };

      return data;
    },
  ),
  target: addPersonalNumberFx,
});

$addPersonalNumberRequestStatus
  .on(addPersonalNumberFx.done, () => 'done')
  .on(addPersonalNumberFx.fail, () => 'failed')
  .on(setAddPersonalNumberStatus, (_, status) => status);

forward({
  from: onForced,
  to: addPersonalNmberSaveButtonClicked,
});

forward({
  from: addPersonalNumberFx.doneData,
  to: handleConfirmationModalClose,
});

addPersonalNumberFx.failData.watch((error) => {
  if (
    error.response.data.error.Code === 'HomeownerAccountAlreadyExistConflict'
  ) {
    return;
  }

  return message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});
