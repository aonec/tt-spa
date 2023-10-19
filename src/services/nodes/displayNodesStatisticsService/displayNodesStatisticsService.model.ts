import { createEffect, createEvent, createStore } from 'effector';
import { forward, sample } from 'effector';
import { createGate } from 'effector-react';
import dayjs from 'api/dayjs';
import {
  ArchivesDataModel,
  DateTimeTaskStatisticsItemArrayDictionaryItem,
  TaskStatisticsResponse,
} from 'api/types';
import {
  requestNodeReadings,
  requestTaskStatistics,
} from './displayNodesStatisticsService.api';
import {
  ArchiveReadingsFilter,
  FetchArchiveReadingsPayload,
  TasksStatisticPayload,
} from './displayNodesStatisticsService.types';

const NodeInfoGate = createGate<{ nodeId: number; pipeCount: number }>();

const clearStores = createEvent();

const setGraphType = createEvent<string>();
const $graphType = createStore<string>('')
  .on(setGraphType, (_, type) => type)
  .reset(clearStores);

const setArchiveFilter = createEvent<ArchiveReadingsFilter>();
const $archiveFilter = createStore<ArchiveReadingsFilter>({
  ReportType: 'hourly',
  From: dayjs()
    .subtract(1, 'week')
    .startOf('day')
    .format('YYYY-MM-DD HH:mm:ss'),
  To: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
})
  .on(setArchiveFilter, (_, filter) => filter)
  .reset(clearStores);

const getArchiveDataFx = createEffect<
  FetchArchiveReadingsPayload,
  ArchivesDataModel
>(requestNodeReadings);
const $archiveReadings = createStore<ArchivesDataModel | null>(null)
  .on(getArchiveDataFx.doneData, (_, data) => data)
  .reset(clearStores);

const getTaskStatisticsFx = createEffect<
  TasksStatisticPayload,
  TaskStatisticsResponse
>(requestTaskStatistics);
const $taskStatistics = createStore<
  DateTimeTaskStatisticsItemArrayDictionaryItem[]
>([]).on(getTaskStatisticsFx.doneData, (_, data) => data.tasks || []);

const setWithFault = createEvent<boolean>();
const $withFault = createStore(true).on(
  setWithFault,
  (_, withFault) => withFault,
);

const $isLoading = getArchiveDataFx.pending;

sample({
  source: NodeInfoGate.state,
  clock: $archiveFilter,
  fn: (nodeInfo, filter) => ({ ...nodeInfo, ...filter }),
  target: [getArchiveDataFx, getTaskStatisticsFx],
});

sample({
  source: $archiveFilter,
  clock: NodeInfoGate.open,
  fn: (filter, nodeInfo) => ({ ...nodeInfo, ...filter }),
  target: [getArchiveDataFx, getTaskStatisticsFx],
});

forward({
  from: NodeInfoGate.close,
  to: clearStores,
});

export const displayNodesStatisticsService = {
  inputs: {
    setArchiveFilter,
    setGraphType,
    setWithFault,
  },
  outputs: {
    $archiveFilter,
    $graphType,
    $archiveReadings,
    $isLoading,
    $taskStatistics,
    $withFault,
  },
  gates: { NodeInfoGate },
};
