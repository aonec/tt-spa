import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import _ from 'lodash';
import { getCurrentManagingFirm } from './currentOrganizationService.api';
import { OrganizationResponse } from 'api/types';
import { OrganizationCoordinates } from './currentOrganizationService.types';

const CurrentManagingFirmGate = createGate();

const getCurrentManagingFirmFx = createEffect<
  void,
  OrganizationResponse | null
>(getCurrentManagingFirm);

const $currentManagingFirm = createStore<OrganizationResponse | null>(null).on(
  getCurrentManagingFirmFx.doneData,
  (_, organization) => organization,
);

const $userCity = $currentManagingFirm.map(
  (organization) => organization?.address?.city || null,
);

const $hasCorpuses = $currentManagingFirm.map(
  (organization) =>
    organization?.filtersConfiguration?.hasHousingStockCorpuses || false,
);

const $diametersConfig = $currentManagingFirm.map((organization) => {
  const diameters = (
    organization?.filtersConfiguration?.pipeDiameters || []
  ).sort((first, second) => first - second);

  const minValue = _.first(diameters) || 0;
  const maxValue = _.last(diameters) || 255;

  const marks = diameters.reduce((acc, value) => {
    if (value === minValue) {
      return { [value]: String(value), ...acc };
    }
    if (value === maxValue) {
      return { ...acc, [value]: String(value) };
    }
    return { ...acc, [value]: ' ' };
  }, {} as { [key: string]: string });

  return { marks, maxValue, minValue, diameters };
});

const $organizationCoordinates = $currentManagingFirm.map(
  (organization): OrganizationCoordinates | null => {
    if (!organization?.latitude || !organization?.longitude) {
      return null;
    }

    return [organization.latitude, organization.longitude];
  },
);

const devUrl = 'https://stage.k8s.transparent-technology.ru/api/';
const devApiURL = localStorage.getItem('dev-api-url');

export const baseURL = process.env.REACT_APP_API_URL || devUrl;

const apiURL = devApiURL || baseURL;

const setDevUrl = createEvent<string>();
const $devUrl = createStore(apiURL || '').on(setDevUrl, (_, devUrl) => devUrl);

sample({
  clock: CurrentManagingFirmGate.open,
  target: getCurrentManagingFirmFx,
});

export const currentOrganizationService = {
  outputs: {
    $currentManagingFirm,
    $userCity,
    $organizationCoordinates,
    $diametersConfig,
    $hasCorpuses,
    $devUrl,
  },
  gates: { CurrentManagingFirmGate },
  inputs: { setDevUrl },
};
