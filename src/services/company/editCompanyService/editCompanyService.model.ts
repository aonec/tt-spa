import { message } from 'antd';
import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { OrganizationResponse, OrganizationUpdateRequest } from 'api/types';
import { EffectFailDataAxiosError } from 'types';
import {
  fetchCurrentManagingFirm,
  fetchUpdateOrganization,
} from './editCompanyService.api';
import { OrganizationUpdatePayload } from './editCompanyService.types';
import { createForm } from 'effector-forms';

const domain = createDomain('editCompanyService');

const clearCurrentManagingFirm = domain.createEvent();
const getCurrentManagingFirmFx = domain.createEffect<
  void,
  OrganizationResponse
>(fetchCurrentManagingFirm);
const $currentManagingFirm = domain
  .createStore<OrganizationResponse | null>(null)
  .on(getCurrentManagingFirmFx.doneData, (_, firm) => firm)
  .reset(clearCurrentManagingFirm);

const editCompanyForm = createForm<OrganizationUpdateRequest>({
  fields: {
    city: { init: null as string | null },
    corpus: { init: null as string | null },
    street: { init: null as string | null },
    houseNumber: { init: null as string | null },
    email: { init: null as string | null },
    name: { init: null as string | null },
    phoneNumber: { init: null as string | null },
  },
  validateOn: ['submit'],
});

sample({
  clock: $currentManagingFirm,
  filter: Boolean,
  target: editCompanyForm.setForm,
});

const updateOrganizationFx = domain.createEffect<
  OrganizationUpdatePayload,
  void,
  EffectFailDataAxiosError
>(fetchUpdateOrganization);

const organizationUpdated = updateOrganizationFx.doneData;

const EditCompanyGate = createGate();

const $isOrganizationLoading = getCurrentManagingFirmFx.pending;
const $isUpdating = updateOrganizationFx.pending;

sample({
  source: sample({
    source: $currentManagingFirm.map((firm) => firm?.id),
    filter: (id): id is number => Boolean(id),
  }),
  clock: editCompanyForm.formValidated,
  fn: (managingFirmId, payload) => ({ managingFirmId, ...payload }),
  target: updateOrganizationFx,
});

forward({
  from: EditCompanyGate.open,
  to: getCurrentManagingFirmFx,
});

forward({
  from: EditCompanyGate.close,
  to: [clearCurrentManagingFirm, editCompanyForm.reset],
});

updateOrganizationFx.doneData.watch(() =>
  message.success('Информация о компании успешна отредактирована!'),
);

export const editCompanyService = {
  inputs: {
    organizationUpdated,
  },
  outputs: {
    $currentManagingFirm,
    $isOrganizationLoading,
    $isUpdating,
  },
  gates: { EditCompanyGate },
  forms: { editCompanyForm },
};
