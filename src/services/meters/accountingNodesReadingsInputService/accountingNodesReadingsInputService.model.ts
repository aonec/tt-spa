import { createEffect, createEvent, createStore } from 'effector';
import { sample } from 'effector';
import {
  createOrUpdateNodeReading,
  createOrUpdateNonResidentialRoomConsumption,
  deleteNodeReading,
  fetchReadingsOfElectricNode,
} from './accountingNodesReadingsInputService.api';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'api/types';
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
import dayjs from 'api/dayjs';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';
import { confirmReadingService } from '../readingsHistoryService/confirmReadingService/confirmReadingService.model';

const AccountingNodesReadingsInputGate = createGate<{
  nodeId: number;
  deviceId: number;
}>();

const removeReading = createEvent<DeleteNodeReading>();
const removeReadingFx = createEffect(deleteNodeReading);

const sendReading = createEvent<CreateHousingMeteringDeviceReadingsPayload>();
const sendReadingFx = createEffect<
  CreateHousingMeteringDeviceReadingsPayload,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
  EffectFailDataAxiosError
>(createOrUpdateNodeReading);

const sendNonResConsumptionReading =
  createEvent<UpdateHousingMeteringDeviceReadingsPayload>();
const sendNonResConsumptionReadingFx = createEffect<
  UpdateHousingMeteringDeviceReadingsPayload,
  HousingMeteringDeviceReadingsIncludingPlacementResponse
>(createOrUpdateNonResidentialRoomConsumption);

const getReadingsOfElectricNodeFx = createEffect<
  { nodeId: number },
  HousingMeteringDeviceReadingsIncludingPlacementResponse[]
>(fetchReadingsOfElectricNode);
const $readings = createStore<NodeReadingsDataByDevices>({})
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

const setLoadingStatusToNonResConsumptionInput = createEvent<{
  oldReadingId: string;
}>();
const $nonResConsumptionInputStatuses = createStore<NodeReadingsStatuses>({})
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

const setLoadingStatusToInput = createEvent<{
  deviceId: number;
  readingDate: string;
}>();
const setInitialLoadingInputStatuses = createEvent<{
  deviceId: number;
}>();
const $deviceInputStatuses = createStore<NodeReadingsStatusesByDevices>({})
  .on(setInitialLoadingInputStatuses, (statuses, { deviceId }) => ({
    ...statuses,
    [deviceId]: getELectricNodeInputStatuses(MetersInputBlockStatus.Loading),
  }))
  .on(getReadingsOfElectricNodeFx.done, (statuses, { result }) => {
    if (!result.length) {
      return statuses;
    }
    return {
      ...statuses,
      [result[0].deviceId]: getELectricNodeInputStatuses(null),
    };
  })
  .on(setLoadingStatusToInput, (statuses, { deviceId, readingDate }) => {
    const index = dayjs()
      .startOf('M')
      .diff(dayjs(readingDate).startOf('M'), 'M');

    const statusesByDevice = statuses[deviceId];

    statusesByDevice[index] = MetersInputBlockStatus.Loading;

    return {
      ...statuses,
      [deviceId]: statusesByDevice,
    };
  })
  .on(sendReadingFx.done, (statuses, { params }) => {
    const { readingDate, deviceId } = params;
    const index = dayjs()
      .startOf('M')
      .diff(dayjs(readingDate).startOf('M'), 'M');

    const statusesByDevice = statuses[deviceId];

    statusesByDevice[index] = MetersInputBlockStatus.Done;

    return {
      ...statuses,
      [deviceId]: statusesByDevice,
    };
  })
  .on(sendReadingFx.fail, (statuses, { params }) => {
    const { readingDate, deviceId } = params;
    const index = dayjs()
      .startOf('M')
      .diff(dayjs(readingDate).startOf('M'), 'M');

    const statusesByDevice = statuses[deviceId];

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
    closeConfirmReadingModal:
      confirmReadingService.inputs.closeConfirmReadingModal,
  },
  outputs: {
    $readings,
    $deviceInputStatuses,
    $nonResConsumptionInputStatuses,
  },
  gates: { AccountingNodesReadingsInputGate },
};
