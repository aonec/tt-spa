import { createDomain, sample } from 'effector';
import { apartmentService } from 'services/apartments/apartmentService';
import { displayContractorsService } from 'services/contractors/displayContractorsService';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService';
import { displayIndividualDeviceAndNamesService } from '../displayIndividualDeviceAndNamesService';
import { createIndividualDevice } from './addIndividualDeviceService.api';
import { EffectFailDataAxiosError } from 'types';
import { CreateIndividualDeviceRequest, MeteringDeviceResponse } from 'myApi';

const domain = createDomain('addIndividualDeviceService');

const handleGoNextStage = domain.createEvent();
const handleGoPrevStage = domain.createEvent();

const handleSubmitForm = domain.createEvent<CreateIndividualDeviceRequest>();
const handleCreateDevice = domain.createEvent();

const createIndividualDeviceFx = domain.createEffect<
  CreateIndividualDeviceRequest,
  MeteringDeviceResponse,
  EffectFailDataAxiosError
>(createIndividualDevice);

const $stageNumber = domain
  .createStore<number>(1)
  .on(handleGoNextStage, (prev) => prev + 1)
  .on(handleGoPrevStage, (prev) => prev - 1);

const $formsData = domain
  .createStore<CreateIndividualDeviceRequest | null>(null)
  .on(handleSubmitForm, (prev, data) => {
    return { ...prev, ...data };
  });

sample({
  clock: handleCreateDevice,
  source: $formsData,
  filter: Boolean,
  target: createIndividualDeviceFx,
});

export const addIndividualDeviceService = {
  inputs: {
    handleGoNextStage,
    handleGoPrevStage,
    handleFetchSerialNumberForCheck:
      displayIndividualDeviceAndNamesService.inputs
        .handleFetchSerialNumberForCheck,
    handleCreateDevice,
    handleSubmitForm,
  },
  outputs: {
    $stageNumber,
    $apartment: apartmentService.outputs.$apartment,
    $individualDevicesNames:
      displayIndividualDeviceAndNamesService.outputs.$individualDevicesNames,
    $individualDeviceMountPlaces:
      individualDeviceMountPlacesService.outputs.$individualDeviceMountPlaces,
    $contractors: displayContractorsService.outputs.$contractors,
    $isFetchSerialNumberLoading:
      displayIndividualDeviceAndNamesService.outputs
        .$isFetchSerialNumberLoading,
    $serialNumberForChecking:
      displayIndividualDeviceAndNamesService.outputs.$serialNumberForChecking,
    $formsData,
  },
  gates: {
    ApartmentGate: apartmentService.gates.ApartmentGate,
    ContractorsGate: displayContractorsService.gates.ContractorsGate,
    IndividualDevicecModelsGate:
      displayIndividualDeviceAndNamesService.gates.IndividualDevicecModelsGate,
    IndividualDeviceMountPlacesGate:
      individualDeviceMountPlacesService.gates.IndividualDeviceMountPlacesGate,
  },
};
