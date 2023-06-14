import { createDomain, sample } from 'effector';
import {
  createOrUpdateNodeReading,
  createOrUpdateNonResidentialRoomConsumption,
  fetchReadingsOfElectricNode,
} from './accountingNodesReadingsInputService.api';
import { HousingMeteringDeviceReadingsIncludingPlacementResponse } from 'myApi';
import { createGate } from 'effector-react';
import {
  getELectricNodeInputStatuses,
  getPreparedNodeReadingsDictionary,
} from './accountingNodesReadingsInputService.utils';
import {
  CreateHousingMeteringDeviceReadingsPayload,
  NodeReadingsStatuses,
  NodeReadingsStatusesByDevices,
  PreparedNodeReadingsDataByDevices,
  UpdateHousingMeteringDeviceReadingsPayload,
} from './accountingNodesReadingsInputService.types';
import { MetersInputBlockStatus } from '../individualDeviceMetersInputService/view/MetersInputsBlock/MetersInputsBlock.types';
import moment from 'moment';
import { EffectFailDataAxiosError } from 'types';
import { message } from 'antd';

const domain = createDomain('accountingNodesReadingsInputService');

const AccountingNodesReadingsInputGate = createGate<{
  nodeId: number;
  deviceId: number;
}>();

const sendReading =
  domain.createEvent<CreateHousingMeteringDeviceReadingsPayload>();
const sendReadingFx = domain.createEffect<
  CreateHousingMeteringDeviceReadingsPayload,
  void,
  EffectFailDataAxiosError
>(createOrUpdateNodeReading);

const sendNonResConsumptionReading =
  domain.createEvent<UpdateHousingMeteringDeviceReadingsPayload>();
const sendNonResConsumptionReadingFx = domain.createEffect<
  UpdateHousingMeteringDeviceReadingsPayload,
  void
>(createOrUpdateNonResidentialRoomConsumption);

const setLoadingStatusToNonResConsumptionInput = domain.createEvent<{
  id: string;
}>();
const $nonResConsumptionInputStatuses = domain
  .createStore<NodeReadingsStatuses>({})
  .on(setLoadingStatusToNonResConsumptionInput, (statuses, { id }) => ({
    ...statuses,
    [id]: MetersInputBlockStatus.Loading,
  }))
  .on(sendNonResConsumptionReadingFx.done, (statuses, { params }) => ({
    ...statuses,
    [params.id]: MetersInputBlockStatus.Done,
  }))
  .on(sendNonResConsumptionReadingFx.fail, (statuses, { params }) => ({
    ...statuses,
    [params.id]: MetersInputBlockStatus.Failed,
  }));

const getReadingsOfElectricNodeFx = domain.createEffect<
  { nodeId: number },
  HousingMeteringDeviceReadingsIncludingPlacementResponse[]
>(fetchReadingsOfElectricNode);
const $readings = domain
  .createStore<PreparedNodeReadingsDataByDevices>({})
  .on(getReadingsOfElectricNodeFx.done, (readings, { params, result }) => {
    if (!result.length) {
      return readings;
    }
    return {
      ...readings,
      [result[0].deviceId]: getPreparedNodeReadingsDictionary(result),
    };
  })
  .reset(AccountingNodesReadingsInputGate.close);

const setLoadingStatusToInput = domain.createEvent<{
  deviceId: number;
  readingDate: string;
}>();
const setLoadingInputStatuses = domain.createEvent<{ deviceId: number }>();
const $deviceInputStatuses = domain
  .createStore<NodeReadingsStatusesByDevices>({})
  .on(setLoadingInputStatuses, (statuses, { deviceId }) => ({
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
    const index = moment().startOf('M').diff(readingDate, 'M');
    let statusesByDevice = statuses[deviceId];

    statusesByDevice[index] = MetersInputBlockStatus.Loading;

    return {
      ...statuses,
      [deviceId]: statusesByDevice,
    };
  })
  .on(sendReadingFx.done, (statuses, { params }) => {
    const { readingDate, deviceId } = params;
    const index = moment().startOf('M').diff(readingDate, 'M');

    let statusesByDevice = statuses[deviceId];

    statusesByDevice[index] = MetersInputBlockStatus.Done;

    return {
      ...statuses,
      [deviceId]: statusesByDevice,
    };
  })
  .on(sendReadingFx.fail, (statuses, { params }) => {
    const { deviceId, readingDate } = params;
    const index = moment().startOf('M').diff(readingDate, 'M');

    let statusesByDevice = statuses[deviceId];

    statusesByDevice[index] = MetersInputBlockStatus.Failed;

    return {
      ...statuses,
      [deviceId]: statusesByDevice,
    };
  })
  .reset(AccountingNodesReadingsInputGate.close);

sample({
  source: AccountingNodesReadingsInputGate.state,
  clock: AccountingNodesReadingsInputGate.open,
  target: [getReadingsOfElectricNodeFx, setLoadingInputStatuses],
});

sample({
  clock: sendReading,
  target: [sendReadingFx, setLoadingStatusToInput],
});

sample({
  clock: sendNonResConsumptionReading,
  target: sendNonResConsumptionReadingFx,
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
  },
  outputs: {
    $readings,
    $deviceInputStatuses,
    $nonResConsumptionInputStatuses,
  },
  gates: { AccountingNodesReadingsInputGate },
};
