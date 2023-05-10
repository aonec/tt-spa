import { createDomain } from 'effector';
import { HomeownerAccountCreateRequest } from 'myApi';
import { apartmentProfileService } from 'services/apartments/apartmentProfileService';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';
import { addHomeowner } from './addPersonalNumberService.api';

const domain = createDomain('addPersonalNumberService');

const addPersonalNumberFx = domain.createEffect<
  HomeownerAccountCreateRequest,
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(addHomeowner);

const $isLoading = addPersonalNumberFx.pending;

export const addPersonalNumberService = {
  inputs: {},
  outputs: {
    $apartment: apartmentProfileService.outputs.$apartment,
    $isLoading,
  },
};
