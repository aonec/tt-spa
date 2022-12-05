import { message } from 'antd';
import { createDomain, forward, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import { HouseManagementResponse, HousingStockCreateRequest } from 'myApi';
import { getHouseManagements } from './createObjectService.api';
import { ObjectCreateSubmitData } from './createObjectService.types';
import { IsElevatorDictionaryBoolean } from './view/CreateObjectPage/CreateObjectFinalStageModal/CreateObjectFinalStageModal.constants';

const domain = createDomain('createObjectService');

const goBackStage = domain.createEvent();

const handleSubmitCreateObject = domain.createEvent<ObjectCreateSubmitData>();

const handlePostCreateObject = domain.createEvent();

const closePreviewModal = domain.createEvent<void>();
const openPreviewModal = domain.createEvent<void>();

const resetter = domain.createEvent<void>();

const HouseManagementsFetchGate = createGate();
const PageCloseGate = createGate();

const fetchHouseManagementsFx = domain.createEffect<
  void,
  HouseManagementResponse[] | null
>(getHouseManagements);



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
  .on(handleSubmitCreateObject, (stageNumber) =>
    stageNumber === 3 ? stageNumber : stageNumber + 1
  )
  .on(goBackStage, (stageNumber) =>
    stageNumber === 1 ? stageNumber : stageNumber - 1
  )
  .reset(resetter);

const $houseManagements = domain
  .createStore<HouseManagementResponse[] | null>(null)
  .on(fetchHouseManagementsFx.doneData, (_, data) => data);


const $isPreviewModalOpen = domain
  .createStore<boolean>(false)
  .on(closePreviewModal, () => false)
  .on(openPreviewModal, () => true);

forward({
  from: HouseManagementsFetchGate.open,
  to: fetchHouseManagementsFx,
});

const $createObjectData = domain
  .createStore<ObjectCreateSubmitData | null>(null)
  .on(handleSubmitCreateObject, (oldData, newData) => ({
    ...oldData,
    ...newData,
  }));

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
        objectCategotry,
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
        !objectCategotry
      )
        return null;

      const payload: HousingStockCreateRequest = {
        mainAddress: {
          city,
          street,
          number: house,
          corpus,
        },
        index,
        otherAddresses:
          additionalAddresses?.map((e) => {
            return {
              city,
              street: e.street,
              number: e.house,
              corpus: e.corpus,
            };
          }) || null,
        heatingStationId,
        houseManagementId: houseManagement,
        houseCategory: objectCategotry,
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
  },
  outputs: {
    $createObjectData,
    $stageNumber,
    $houseManagements,
  },
  gates: { HouseManagementsFetchGate },
};
