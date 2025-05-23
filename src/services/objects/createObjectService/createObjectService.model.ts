import { createEffect, createEvent, createStore } from 'effector';
import { message } from 'antd';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { EffectFailDataAxiosError } from 'types';
import { createHeatingStationService } from '../heatingStations/createHeatingStationService';
import { displayHeatingStationsService } from '../heatingStations/displayHeatingStationsService';
import { editHeatingStationService } from '../heatingStations/editHeatingStationService';
import { createObject } from './createObjectService.api';
import {
  CreateBuildingRequest,
  CreateBuildingResponse,
  ObjectCreateSubmitData,
} from './createObjectService.types';
import { IsElevatorDictionaryBoolean } from './view/CreateObjectPage/CreateObjectFinalStageModal/CreateObjectFinalStageModal.constants';

const goBackStage = createEvent();

const goNextStage = createEvent();

const handleSubmitCreateObject = createEvent<ObjectCreateSubmitData>();

const handlePostCreateObject = createEvent();

const closePreviewModal = createEvent();
const openPreviewModal = createEvent();

const openEditHeatingStationModal =
  editHeatingStationService.inputs.handleOpenModal;

const heatingStationCapture =
  editHeatingStationService.inputs.currentHeatingStatitonDataCapture;

const handleHeatindStationModalOpen =
  createHeatingStationService.inputs.handleOpenModal;

const resetter = createEvent();

const PageCloseGate = createGate();

const HeatingStationsFetchGate =
  displayHeatingStationsService.gates.HeatingStationsFetchGate;

const createObjectFx = createEffect<
  CreateBuildingRequest,
  CreateBuildingResponse,
  EffectFailDataAxiosError
>(createObject);

const handleCreateObjectSuccessDone = createObjectFx.doneData;

const $createObjectData = createStore<ObjectCreateSubmitData | null>(null)
  .on(handleSubmitCreateObject, (oldData, newData) => ({
    ...oldData,
    ...newData,
  }))
  .reset(resetter);

const $stageNumber = createStore<number>(1)
  .on(goNextStage, (stageNumber) => stageNumber + 1)
  .on(goBackStage, (stageNumber) => stageNumber - 1)
  .reset(resetter);

sample({
  source: $stageNumber,
  clock: handleSubmitCreateObject,
  filter: (stageNumber) => stageNumber < 3,
  target: goNextStage,
});

const $isPreviewModalOpen = createStore<boolean>(false)
  .on(openPreviewModal, () => true)
  .reset(resetter, closePreviewModal);

const $heatingStations = displayHeatingStationsService.outputs.$heatingStations;

sample({
  clock: PageCloseGate.close,
  target: resetter,
});

sample({
  clock: sample({
    source: $createObjectData,
    clock: handlePostCreateObject,
    fn: (data) => {
      if (!data) return null;

      const {
        city,
        street,
        house,
        corpus,
        index,
        additionalAddresses,
        heatingStationId,
        houseManagement,
        objectCategory,
        livingHouseType,
        floors,
        entrances,
        elevator,
        constructionYear,
        hasIndividualHeatingStation,
        nonResidentialHouseType,
      } = data;

      if (!city || !street || !house || !heatingStationId || !objectCategory)
        return null;

      const payload: CreateBuildingRequest = {
        city,
        mainAddress: {
          city,
          street,
          number: house,
          corpus,
        },
        index,
        otherAddresses:
          additionalAddresses?.map((elem) => {
            return {
              city,
              street: elem.street,
              number: elem.house,
              corpus: elem.corpus,
            };
          }) || null,
        heatingStationId,
        houseManagementId: houseManagement,
        livingHouseType: livingHouseType || null,
        nonResidentialHouseType: nonResidentialHouseType || null,
        numberOfFloors: Number(floors) || null,
        numberOfEntrances: Number(entrances) || null,
        isThereElevator: elevator
          ? IsElevatorDictionaryBoolean[elevator]
          : null,
        constructionYear: Number(constructionYear) || null,
        hasIndividualHeatingStation: hasIndividualHeatingStation,
        objectCategory,
      };

      return payload;
    },
  }),
  filter: (data): data is CreateBuildingRequest => Boolean(data),
  target: createObjectFx,
});

createObjectFx.failData.watch((error) => {
  message.error(
    error.response.data.error.Text || error.response.data.error.Message,
  );
});

createObjectFx.doneData.watch(() => message.success('Дом успешно создан!'));

const $isCreateLoading = createObjectFx.pending;

export const createObjectService = {
  inputs: {
    goBackStage,
    handleSubmitCreateObject,
    handlePostCreateObject,
    openPreviewModal,
    closePreviewModal,
    handleCreateObjectSuccessDone,
    openEditHeatingStationModal,
    heatingStationCapture,
    handleHeatindStationModalOpen,
  },
  outputs: {
    $createObjectData,
    $stageNumber,
    $isPreviewModalOpen,
    $heatingStations,
    $isCreateLoading,
  },
  gates: { PageCloseGate, HeatingStationsFetchGate },
};
