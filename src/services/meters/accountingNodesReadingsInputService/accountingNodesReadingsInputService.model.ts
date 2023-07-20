import { createDomain, sample } from 'effector';
import {
  createOrUpdateNodeReading,
  createOrUpdateNonResidentialRoomConsumption,
  deleteNodeReading,
  fetchReadingsOfElectricNode,
} from './accountingNodesReadingsInputService.api';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';
import { createGate } from 'effector-react';
import { getELectricNodeInputStatuses } from './accountingNodesReadingsInputService.utils';
import {
  CreateHousingMeteringDeviceReadingsPayload,
  DeleteNodeReading,
  NodeReadingsDataByDevices,
  NodeReadingsStatuses,
  NodeReadingsStatusesByDevices,
  UpdateHousingMeteringDeviceReadingsPayload,
} from './accountingNodesReadingsInputService.types';
import { MetersInputBlockStatus } from '../individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.types';
import moment from 'moment';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { confirmReadingService } from '../readingsHistoryService/confirmReadingService/confirmReadingService.model';

const domain = createDomain('accountingNodesReadingsInputService');

const AccountingNodesReadingsInputGate = createGate<{
  nodeId: number;
  deviceId: number;
}>();

const removeReading = domain.createEvent<DeleteNodeReading>();
const removeReadingFx = domain.createEffect(deleteNodeReading);

const sendReading =
  domain.createEvent<CreateHousingMeteringDeviceReadingsPayload>();
const sendReadingFx = domain.createEffect<
  CreateHousingMeteringDeviceReadingsPayload,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
  EffectFailDataAxiosError
>(createOrUpdateNodeReading);

const sendNonResConsumptionReading =
  domain.createEvent<UpdateHousingMeteringDeviceReadingsPayload>();
const sendNonResConsumptionReadingFx = domain.createEffect<
  UpdateHousingMeteringDeviceReadingsPayload,
  HousingMeteringDeviceReadingsIncludingPlacementResponse
>(createOrUpdateNonResidentialRoomConsumption);

const getReadingsOfElectricNodeFx = domain.createEffect<
  { nodeId: number },
  HousingMeteringDeviceReadingsIncludingPlacementResponse[]
>(fetchReadingsOfElectricNode);
const $readings = domain
  .createStore<NodeReadingsDataByDevices>({})
  .on(getReadingsOfElectricNodeFx.doneData, (readings, result) => {
    if (!result.length) {
      return readings;
    }
    return {
      ...readings,
      [result[0].deviceId]: result,
    };
  })
  .on(
    [sendReadingFx.done, sendNonResConsumptionReadingFx.done],
    (readings, { params, result: newReading }) => {
      const { deviceId, oldReadingId } = params;
      const filteredReadings = (readings[deviceId] || []).filter(
        (elem) => elem.id !== oldReadingId,
      );

      return { ...readings, [deviceId]: [...filteredReadings, newReading] };
    },
  )
  .on(removeReadingFx.done, (readings, { params }) => {
    const { id, deviceId } = params;
    const filteredReadings = (readings[deviceId] || []).filter(
      (elem) => elem.id !== id,
    );

    return { ...readings, [deviceId]: filteredReadings };
  })
  .reset(AccountingNodesReadingsInputGate.close);

const setLoadingStatusToNonResConsumptionInput = domain.createEvent<{
  oldReadingId: string;
}>();
const $nonResConsumptionInputStatuses = domain
  .createStore<NodeReadingsStatuses>({})
  .on(
    setLoadingStatusToNonResConsumptionInput,
    (statuses, { oldReadingId }) => ({
      ...statuses,
      [oldReadingId]: MetersInputBlockStatus.Loading,
    }),
  )
  .on(sendNonResConsumptionReadingFx.done, (statuses, { params }) => ({
    ...statuses,
    [params.oldReadingId]: MetersInputBlockStatus.Done,
  }))
  .on(sendNonResConsumptionReadingFx.fail, (statuses, { params }) => ({
    ...statuses,
    [params.oldReadingId]: MetersInputBlockStatus.Failed,
  }));

const setLoadingStatusToInput = domain.createEvent<{
  deviceId: number;
  readingDate: string;
}>();
const setInitialLoadingInputStatuses = domain.createEvent<{
  deviceId: number;
}>();
const $deviceInputStatuses = domain
  .createStore<NodeReadingsStatusesByDevices>({})
  .on(setInitialLoadingInputStatuses, (statuses, { deviceId }) => ({
    ...statuses,
    [deviceId]: getELectricNodeInputStatuses(MetersInputBlockStatus.Loading),
  }))
  .on(getReadingsOfElectricNodeFx.done, (statuses, { params, result }) => {
    if (!result.length) {
      return statuses;
    }
    return {
      ...statuses,
      [result[0].deviceId]: getELectricNodeInputStatuses(null),
    };
  })
  .on(setLoadingStatusToInput, (statuses, { deviceId, readingDate }) => {
    const index = moment()
      .startOf('M')
      .diff(moment(readingDate).startOf('M'), 'M');

    let statusesByDevice = statuses[deviceId];

    statusesByDevice[index] = MetersInputBlockStatus.Loading;

    return {
      ...statuses,
      [deviceId]: statusesByDevice,
    };
  })
  .on(sendReadingFx.done, (statuses, { params }) => {
    const { readingDate, deviceId } = params;
    const index = moment()
      .startOf('M')
      .diff(moment(readingDate).startOf('M'), 'M');

    let statusesByDevice = statuses[deviceId];

    statusesByDevice[index] = MetersInputBlockStatus.Done;

    return {
      ...statuses,
      [deviceId]: statusesByDevice,
    };
  })
  .on(sendReadingFx.fail, (statuses, { params }) => {
    const { readingDate, deviceId } = params;
    const index = moment()
      .startOf('M')
      .diff(moment(readingDate).startOf('M'), 'M');

    let statusesByDevice = statuses[deviceId];

    statusesByDevice[index] = MetersInputBlockStatus.Failed;

    return {
      ...statuses,
      [deviceId]: statusesByDevice,
    };
  })
  .reset(AccountingNodesReadingsInputGate.close);

sample({
  clock: AccountingNodesReadingsInputGate.open,
  target: [getReadingsOfElectricNodeFx, setInitialLoadingInputStatuses],
});

sample({
  clock: sendReading,
  target: [sendReadingFx, setLoadingStatusToInput],
});

sample({
  clock: sendNonResConsumptionReading,
  target: [
    sendNonResConsumptionReadingFx,
    setLoadingStatusToNonResConsumptionInput,
  ],
});

sample({
  clock: removeReading,
  target: removeReadingFx,
});

sendReadingFx.failData.watch((error) =>
  message.error(
    error.response.data.error.Text ||
      error.response.data.error.Message ||
      'Произошла необработанная ошибка',
  ),
);

export const accountingNodesReadingsInputService = {
  inputs: {
    sendReading,
    sendNonResConsumptionReading,
    removeReading,
    openConfirmReadingModal:
      confirmReadingService.inputs.openConfirmReadingModal,
  },
  outputs: {
    $readings,
    $deviceInputStatuses,
    $nonResConsumptionInputStatuses,
  },
  gates: { AccountingNodesReadingsInputGate },
};
