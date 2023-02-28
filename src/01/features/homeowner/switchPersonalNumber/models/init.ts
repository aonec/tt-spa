import { replaceHomeownerAccount } from './../../../../_api/homeowners';
import {
  $isForced,
  handleConfirmationModalClose,
  handleSwitchPersonalNumber,
  onForced,
  setSwitchRequestStatus,
  switchPersonalNumber,
  switchPersonalNumberFx,
} from './index';
import { $switchRequestStatus } from '.';
import { combine, forward, sample } from 'effector';
import { personalNumberEditForm } from '../../editPersonalNumber/models';
import { HomeownerGate } from '../../displayHomeowner/models';
import { $apartment } from '01/features/apartments/displayApartment/models';
import moment from 'moment';
import { HomeownerAccountReplaceRequest } from 'myApi';
import { message } from 'antd';
import {
  PersonalNumberFormMountPlaceType,
  PersonalNumberFormTypeGate,
} from '../../editPersonalNumber/components/PersonalNumberEditForm/personalNumberEditForm.controller';

switchPersonalNumberFx.use(replaceHomeownerAccount);

$switchRequestStatus
  .on(setSwitchRequestStatus, (_, status) => status)
  .on(switchPersonalNumberFx.doneData, () => 'done')
  .on(switchPersonalNumberFx.failData, () => 'failed');

forward({
  from: onForced,
  to: switchPersonalNumber,
});

forward({ from: switchPersonalNumber, to: personalNumberEditForm.submit });

sample({
  clock: personalNumberEditForm.formValidated,
  source: PersonalNumberFormTypeGate.state,
  filter: (formType) =>
    formType.type === PersonalNumberFormMountPlaceType.Switch,
  fn: (source) => source.type,
  target: handleSwitchPersonalNumber,
});

sample({
  clock: handleSwitchPersonalNumber,
  source: combine(
    HomeownerGate.state,
    personalNumberEditForm.$values,
    $apartment,
    $isForced,
    (
      gatestate,
      {
        personalAccountNumber,
        paymentCode,
        name,
        phoneNumber,
        openAt,
        isMainAccountingNumber,
      },
      apartment,
      isForced,
    ) => {
      return {
        replaceableAccountId: gatestate?.id,
        newHomeownerAccount: {
          personalAccountNumber,
          paymentCode,
          name,
          phoneNumber,
          openAt: moment(openAt).toISOString(true),
          apartmentId: apartment?.id,
          IsMainOnApartment: isMainAccountingNumber,
        },
        isForced,
      } as HomeownerAccountReplaceRequest;
    },
  ),
  target: switchPersonalNumberFx,
});

switchPersonalNumberFx.failData.watch((error) => {
  if (error.response.status === 403) {
    return message.error(
      'У вашего аккаунта нет доступа к выбранному действию. Уточните свои права у Администратора',
    );
  }

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

forward({
  from: switchPersonalNumberFx.doneData,
  to: handleConfirmationModalClose,
});
