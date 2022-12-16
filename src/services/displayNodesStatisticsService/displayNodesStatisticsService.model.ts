import { setDataToStore } from '01/features/graph/graphView/models';
import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import moment from 'moment';
import {
  ArchivesDataModel,
  DateTimeTaskStatisticsItemArrayDictionaryItem,
  TaskStatisticsResponse,
} from 'myApi';
import {
  requestNodeReadings,
  requestTaskStatistics,
} from './displayNodesStatisticsService.api';
import {
  ArchiveReadingsFilter,
  DateRange,
  FetchArchiveReadingsPayload,
} from './displayNodesStatisticsService.types';

const domain = createDomain('displayNodesStatisticsService');

const clearStores = domain.createEvent();

const setGraphType = domain.createEvent<string>();
const $graphType = domain
  .createStore<string>('')
  .on(setGraphType, (_, type) => type)
  .reset(clearStores);

const setArchiveFilter = domain.createEvent<ArchiveReadingsFilter>();
const $archiveFilter = domain
  .createStore<ArchiveReadingsFilter>({
    ReportType: 'hourly',
    From: moment()
      .subtract(1, 'week')
      .startOf('day')
      .format('YYYY-MM-DD HH:mm:ss'),
    To: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  })
  .on(setArchiveFilter, (_, filter) => filter)
  .reset(clearStores);

const getArchiveDataFx = domain.createEffect<
  FetchArchiveReadingsPayload,
  ArchivesDataModel
>(requestNodeReadings);
const $archiveReadings = domain
  .createStore<ArchivesDataModel | null>(null)
  .on(getArchiveDataFx.doneData, (_, data) => data)
  .reset(clearStores);

const getTaskStatisticsFx = domain.createEffect<
  DateRange,
  TaskStatisticsResponse
>(requestTaskStatistics);
const $taskStatistics = domain
  .createStore<DateTimeTaskStatisticsItemArrayDictionaryItem[]>([])
  .on(getTaskStatisticsFx.doneData, (_, data) => data.tasks || []);

const $isLoading = getArchiveDataFx.pending;

const NodeInfoGate = createGate<{ nodeId: number; pipeCount: number }>();

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
  from: getArchiveDataFx.doneData,
  to: setDataToStore,
});

forward({
  from: NodeInfoGate.close,
  to: clearStores,
});

export const displayNodesStatisticsService = {
  inputs: {
    setArchiveFilter,
    setGraphType,
  },
  outputs: {
    $archiveFilter,
    $graphType,
    $archiveReadings,
    $isLoading,
    $taskStatistics,
  },
  gates: { NodeInfoGate },
};
