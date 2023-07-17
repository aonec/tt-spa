import { message } from 'antd';
import { createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import { HouseManagementResponse } from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { createHeatingStationService } from '../heatingStations/createHeatingStationService';
import { displayHeatingStationsService } from '../heatingStations/displayHeatingStationsService';
import { editHeatingStationService } from '../heatingStations/editHeatingStationService';
import { createObject, getHouseManagements } from './createObjectService.api';
import {
  CreateBuildingRequest,
  CreateBuildingResponse,
  ObjectCreateSubmitData,
} from './createObjectService.types';
import { IsElevatorDictionaryBoolean } from './view/CreateObjectPage/CreateObjectFinalStageModal/CreateObjectFinalStageModal.constants';

const domain = createDomain('createObjectService');

const goBackStage = domain.createEvent();

const goNextStage = domain.createEvent();

const handleSubmitCreateObject = domain.createEvent<ObjectCreateSubmitData>();

const handlePostCreateObject = domain.createEvent();

const closePreviewModal = domain.createEvent();
const openPreviewModal = domain.createEvent();

const openEditHeatingStationModal =
  editHeatingStationService.inputs.handleOpenModal;

const heatingStationCapture =
  editHeatingStationService.inputs.currentHeatingStatitonDataCapture;

const handleHeatindStationModalOpen =
  createHeatingStationService.inputs.handleOpenModal;

const resetter = domain.createEvent();

const HouseManagementsFetchGate = createGate();
const PageCloseGate = createGate();

const HeatingStationsFetchGate =
  displayHeatingStationsService.gates.HeatingStationsFetchGate;

const fetchHouseManagementsFx = domain.createEffect<
  void,
  HouseManagementResponse[] | null
>(getHouseManagements);

const createObjectFx = domain.createEffect<
  CreateBuildingRequest,
  CreateBuildingResponse,
  EffectFailDataAxiosError
>(createObject);

const handleCreateObjectSuccessDone = createObjectFx.doneData;

const $createObjectData = domain
  .createStore<ObjectCreateSubmitData | null>(null)
  .on(handleSubmitCreateObject, (oldData, newData) => ({
    ...oldData,
    ...newData,
  }))
  .reset(resetter);

const $stageNumber = domain
  .createStore<number>(1)
  .on(goNextStage, (stageNumber) => stageNumber + 1)
  .on(goBackStage, (stageNumber) => stageNumber - 1)
  .reset(resetter);

guard({
  source: $stageNumber,
  clock: handleSubmitCreateObject,
  filter: (stageNumber) => stageNumber < 3,
  target: goNextStage,
});

const $houseManagements = domain
  .createStore<HouseManagementResponse[] | null>(null)
  .on(fetchHouseManagementsFx.doneData, (_, data) => data);

const $isPreviewModalOpen = domain
  .createStore<boolean>(false)
  .on(openPreviewModal, () => true)
  .reset(resetter, closePreviewModal);

const $heatingStations = displayHeatingStationsService.outputs.$heatingStations;

forward({
  from: HouseManagementsFetchGate.open,
  to: fetchHouseManagementsFx,
});

forward({
  from: PageCloseGate.close,
  to: resetter,
});

guard({
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

const $isHouseManagementsLoading = fetchHouseManagementsFx.pending;
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
    $houseManagements,
    $isPreviewModalOpen,
    $heatingStations,
    $isHouseManagementsLoading,
    $isCreateLoading,
  },
  gates: { HouseManagementsFetchGate, PageCloseGate, HeatingStationsFetchGate },
};
