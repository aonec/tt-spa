import { message } from 'antd';
import { createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  AddHeatingStationRequest,
  HeatingStationResponse,
  HeatingStationResponsePagedList,
  HouseManagementResponse,
  HousingStockCreateRequest,
  HousingStockResponse,
} from 'myApi';
import { EffectFailDataAxiosError } from 'types';
import { createHeatingStationService } from '../heatingStations/createHeatingStationService';
import { displayHeatingStationsService } from '../heatingStations/displayHeatingStationsService';
import {
  getHeatingStations,
  getHouseManagements,
  postCreateObject,
  postHeatingStation,
} from './createObjectService.api';
import { ObjectCreateSubmitData } from './createObjectService.types';
import { IsElevatorDictionaryBoolean } from './view/CreateObjectPage/CreateObjectFinalStageModal/CreateObjectFinalStageModal.constants';

const domain = createDomain('createObjectService');

const goBackStage = domain.createEvent();

const goNextStage = domain.createEvent();

const handleSubmitCreateObject = domain.createEvent<ObjectCreateSubmitData>();

const handleCreateHeatingStation = domain.createEvent<AddHeatingStationRequest>();

const handlePostCreateObject = domain.createEvent();

const closePreviewModal = domain.createEvent();
const openPreviewModal = domain.createEvent();

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

const fetchHeatingStationFx = domain.createEffect<
  void,
  HeatingStationResponsePagedList | null
>(getHeatingStations);

const createHeatingStationFx = domain.createEffect<
  AddHeatingStationRequest,
  HeatingStationResponse | null
>(postHeatingStation);

const createObjectFx = domain.createEffect<
  HousingStockCreateRequest,
  HousingStockResponse | null,
  EffectFailDataAxiosError
>(postCreateObject);

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
  .on(closePreviewModal, () => false)
  .on(openPreviewModal, () => true);

const $heatingStations = displayHeatingStationsService.outputs.$heatingStations;

forward({
  from: HouseManagementsFetchGate.open,
  to: fetchHouseManagementsFx,
});

forward({
  from: HeatingStationsFetchGate.open,
  to: fetchHeatingStationFx,
});

forward({
  from: handleCreateHeatingStation,
  to: createHeatingStationFx,
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
        additionalAddresses,
        heatingStationId,
        houseManagement,
        objectCategory,
        livingHouseType,
        nonResidentialHouseType,
        floors,
        entrances,
        elevator,
      } = data;

      if (
        !city ||
        !street ||
        !house ||
        !heatingStationId ||
        !houseManagement ||
        !objectCategory
      )
        return null;

      const payload: HousingStockCreateRequest = {
        mainAddress: {
          city,
          street,
          number: house,
          corpus,
        },
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
        houseCategory: objectCategory,
        livingHouseType: livingHouseType || null,
        nonResidentialHouseType: nonResidentialHouseType || null,
        numberOfFloors: Number(floors) || null,
        numberOfEntrances: Number(entrances) || null,
        isThereElevator: elevator
          ? IsElevatorDictionaryBoolean[elevator]
          : null,
      };

      return payload;
    },
  }),
  filter: (data): data is HousingStockCreateRequest => Boolean(data),
  target: createObjectFx,
});

createObjectFx.failData.watch((error) =>
  message.error(error.response.data.error.Text)
);

createObjectFx.doneData.watch(() => message.success('Дом успешно создан!'));

export const createObjectService = {
  inputs: {
    goBackStage,
    handleSubmitCreateObject,
    handleCreateHeatingStation,
    handlePostCreateObject,
    openPreviewModal,
    closePreviewModal,
    handleCreateObjectSuccessDone,
    handleHeatindStationModalOpen,
  },
  outputs: {
    $createObjectData,
    $stageNumber,
    $houseManagements,
    $isPreviewModalOpen,
    $heatingStations,
  },
  gates: { HouseManagementsFetchGate, PageCloseGate, HeatingStationsFetchGate },
};
