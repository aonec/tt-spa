import { createDomain, sample } from 'effector';
import { workWithIndividualDeviceService } from '../workWithIndividualDeviceService.model';
import { displayIndividualDeviceAndNamesService } from '../../displayIndividualDeviceAndNamesService';

const domain = createDomain('workWithIndividualDeviceSubmitActionService');

const submit = domain.createEvent();

const closeModal = domain.createEvent();
const openModal = domain.createEvent();
const $isOpen = domain
  .createStore(false)
  .on(openModal, () => true)
  .reset(closeModal);

const $typeOfAction =
  workWithIndividualDeviceService.gates.WorkWithIndividualDeviceGate.state.map(
    ({ type }) => type,
  );

sample({
  clock: submit,
  target: workWithIndividualDeviceService.inputs.submitAction,
});

sample({
  clock: workWithIndividualDeviceService.forms.deviceInfoForm.formValidated,
  target: openModal,
});

sample({
  clock: workWithIndividualDeviceService.inputs.actionSucceed,
  target: closeModal,
});

export const workWithIndividualDeviceSubmitActionService = {
  inputs: {
    closeModal,
    openModal,
    submit,
  },
  outputs: {
    $isOpen,
    $typeOfAction,
    $individualDevice:
      displayIndividualDeviceAndNamesService.outputs.$individualDevice,
  },
  forms: {
    deviceInfoForm: workWithIndividualDeviceService.forms.deviceInfoForm,
  },
};
