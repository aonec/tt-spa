import { createDomain, forward } from 'effector';
import { HomeownerAccountCreateRequest } from 'myApi';
import { apartmentProfileService } from 'services/apartments/apartmentProfileService';
import { EffectFailDataAxiosErrorDataApartmentId } from 'types';
import { addHomeowner } from './addPersonalNumberService.api';

const domain = createDomain('addPersonalNumberService');

const handleAddPersonalNumber =
  domain.createEvent<HomeownerAccountCreateRequest>();

const addPersonalNumberFx = domain.createEffect<
  HomeownerAccountCreateRequest,
  void,
  EffectFailDataAxiosErrorDataApartmentId
>(addHomeowner);

forward({ from: handleAddPersonalNumber, to: addPersonalNumberFx });

const $isLoading = addPersonalNumberFx.pending;

export const addPersonalNumberService = {
  inputs: { handleAddPersonalNumber },
  outputs: {
    $apartment: apartmentProfileService.outputs.$apartment,
    $isLoading,
  },
  gates: { ApartmentGate: apartmentProfileService.gates.ApartmentGate },
};
