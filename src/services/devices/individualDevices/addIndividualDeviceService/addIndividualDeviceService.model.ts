import { combine, createDomain, sample } from 'effector';
import { apartmentService } from 'services/apartments/apartmentService';
import { displayContractorsService } from 'services/contractors/displayContractorsService';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService';
import { displayIndividualDeviceAndNamesService } from '../displayIndividualDeviceAndNamesService';
import { createIndividualDevice } from './addIndividualDeviceService.api';
import { EffectFailDataAxiosError } from 'types';
import { CreateIndividualDeviceRequest, MeteringDeviceResponse } from 'myApi';
import { DocumentStageForm } from './AddIndividualDevicePage/stages/DocumentsStage/DocumentsStage.types';
import { createGate } from 'effector-react';
import { documentService } from 'ui-kit/DocumentsService/DocumentsService.model';
import { message } from 'antd';

const domain = createDomain('addIndividualDeviceService');

const PageGate = createGate();

const handleGoPrevStage = domain.createEvent();

const handleSubmitForm = domain.createEvent<CreateIndividualDeviceRequest>();
const handleSubmitDocumentStage = domain.createEvent<DocumentStageForm>();
const handleCreateDevice = domain.createEvent();
const handleCloseModal = domain.createEvent();

const createIndividualDeviceFx = domain.createEffect<
  CreateIndividualDeviceRequest,
  MeteringDeviceResponse,
  EffectFailDataAxiosError
>(createIndividualDevice);

const $stageNumber = domain
  .createStore<number>(1)
  .on(handleSubmitForm, (prev) => prev + 1)
  .on(handleGoPrevStage, (prev) => prev - 1)
  .reset(PageGate.close);

const $formData = domain
  .createStore<CreateIndividualDeviceRequest | null>(null)
  .on(handleSubmitForm, (prev, data) => {
    return { ...prev, ...data };
  })
  .reset(PageGate.close);

const $documents = domain
  .createStore<DocumentStageForm | null>(null)
  .on(handleSubmitDocumentStage, (_, docs) => docs)
  .reset(PageGate.close);

const $isModalOpen = domain
  .createStore<boolean>(false)
  .on(handleSubmitDocumentStage, () => true)
  .on(handleCloseModal, () => false)
  .reset(PageGate.close);

sample({
  clock: handleCreateDevice,
  source: combine($formData, $documents, (formData, documents) => {
    const documentsIds =
      (documents &&
        (Object.entries(documents)
          .map((data) => data[1]?.[0].id)
          .filter(Boolean) as number[])) ||
      [];

    return { ...formData, documentsIds };
  }),
  fn: (data) => data as any,
  target: createIndividualDeviceFx,
});

const $isLoading = createIndividualDeviceFx.pending;

const successCreateIndividualDevice = createIndividualDeviceFx.doneData;

createIndividualDeviceFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла ошибка',
  );
});

successCreateIndividualDevice.watch((data) => {
  message.success(`ИПУ (${data.serialNumber}) ${data.model} успешно создан`);
});

export const addIndividualDeviceService = {
  inputs: {
    handleGoPrevStage,
    handleFetchSerialNumberForCheck:
      displayIndividualDeviceAndNamesService.inputs
        .handleFetchSerialNumberForCheck,
    handleCreateDevice,
    handleSubmitForm,
    handleSubmitDocumentStage,
    handleCloseModal,
    successCreateIndividualDevice,
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
    $formData,
    $documents,
    $isModalOpen,
    $isLoading,
    $isDocumentUploadLoading: documentService.outputs.$isLoading,
  },
  gates: {
    ApartmentGate: apartmentService.gates.ApartmentGate,
    ContractorsGate: displayContractorsService.gates.ContractorsGate,
    IndividualDevicecModelsGate:
      displayIndividualDeviceAndNamesService.gates.IndividualDevicecModelsGate,
    IndividualDeviceMountPlacesGate:
      individualDeviceMountPlacesService.gates.IndividualDeviceMountPlacesGate,
    PageGate,
  },
};