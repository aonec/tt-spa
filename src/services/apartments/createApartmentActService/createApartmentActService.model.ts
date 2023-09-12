import { createDomain, sample } from 'effector';
import { AddApartmentActRequest, EActResourceType, EActType } from 'api/types';
import { apartmentActsListService } from '../apartmentActsListService';
import { postApartmentAct } from './createApartmentActService.api';
import { CreateActFormPayload } from './createApartmentActService.types';
import { createForm } from 'effector-forms';
import { required } from 'api/formRules';

const domain = createDomain('createApartmentActService');

const $isModalOpen = domain.createStore(false);
const openModal = domain.createEvent();
const closeModal = domain.createEvent();

$isModalOpen.on(openModal, () => true).reset(closeModal);

const createActFx = domain.createEffect<AddApartmentActRequest, void>(
  postApartmentAct,
);

const createActForm = createForm<CreateActFormPayload>({
  fields: {
    actJobDate: {
      init: '' as string,
      rules: [required()],
    },
    registryNumber: {
      init: '' as string,
      rules: [required()],
    },
    actResourceType: {
      init: EActResourceType.All,
      rules: [required()],
    },
    actType: {
      init: EActType.Admission,
      rules: [required()],
    },
    documentId: {
      init: null,
    },
  },
  validateOn: ['submit'],
});

const $createActIsLoading = createActFx.pending;

sample({
  source: apartmentActsListService.gates.ApartmentActsListGate.state,
  clock: createActForm.formValidated,
  fn: (apartmentId, createActPayload) => ({
    ...apartmentId,
    ...createActPayload,
  }),
  target: createActFx,
});

sample({
  clock: createActFx.doneData,
  target: [apartmentActsListService.inputs.refetchApartmentActs, closeModal],
});

sample({
  clock: closeModal,
  target: createActForm.reset,
});

export const createApartmentActService = {
  inputs: {
    openModal,
    closeModal,
  },
  outputs: {
    $isModalOpen,
    $createActIsLoading,
  },
  forms: {
    createActForm,
  },
};
