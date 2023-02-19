import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { OrganizationResponse, OrganizationUpdateRequest } from 'myApi';
import {
  fetchCurrentManagingFirm,
  fetchUpdateOrganization,
} from './editCompanyService.api';
import { OrganizationUpdatePayload } from './editCompanyService.types';

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

const updateOrganization = domain.createEvent<OrganizationUpdateRequest>();
const updateOrganizationFx = domain.createEffect<
  OrganizationUpdatePayload,
  void
>(fetchUpdateOrganization);

const EditCompanyGate = createGate();

const $isOrganizationLoading = getCurrentManagingFirmFx.pending;

sample({
  source: sample({
    source: $currentManagingFirm.map((firm) => firm?.id),
    filter: (id): id is number => Boolean(id),
  }),
  clock: updateOrganization,
  fn: (managingFirmId, payload) => ({ managingFirmId, payload }),
  target: updateOrganizationFx,
});

forward({
  from: EditCompanyGate.open,
  to: getCurrentManagingFirmFx,
});

forward({
  from: EditCompanyGate.close,
  to: clearCurrentManagingFirm,
});

export const editCompanyService = {
  inputs: {
    updateOrganization,
  },
  outputs: {
    $currentManagingFirm,
    $isOrganizationLoading,
  },
  gates: { EditCompanyGate },
};
