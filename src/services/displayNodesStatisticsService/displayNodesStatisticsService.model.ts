import { setDataToStore } from '01/features/graph/graphView/models';
import { ReadingsInterface } from '01/_pages/Graph/components/GraphView/GraphView.types';
import { GraphParamsType } from '01/_pages/Graph/Graph';
import { createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import moment from 'moment';
import { requestNodeReadings } from './displayNodesStatisticsService.api';
import {
  ArchiveReadingsFilter,
  DateRange,
  FetchArchiveReadingsPayload,
} from './displayNodesStatisticsService.types';

const domain = createDomain('displayNodesStatisticsService');

const clearStores = domain.createEvent();

const setGraphType = domain.createEvent<GraphParamsType>();
const $graphType = domain
  .createStore<GraphParamsType>('deltaMass')
  .on(setGraphType, (_, type) => type);

const setArchiveFilter = domain.createEvent<ArchiveReadingsFilter>();
const $archiveFilter = domain
  .createStore<ArchiveReadingsFilter>({
    reportType: 'daily',
    from: moment()
      .subtract(1, 'week')
      .startOf('day')
      .format('YYYY-MM-DD HH:mm:ss'),
    to: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  })
  .on(setArchiveFilter, (_, filter) => filter)
  .reset(clearStores);

const getArchiveDataFx = domain.createEffect<
  FetchArchiveReadingsPayload,
  ReadingsInterface
>(requestNodeReadings);
const $archiveReadings = domain
  .createStore<ReadingsInterface | null>(null)
  .on(getArchiveDataFx.doneData, (_, data) => data)
  .reset(clearStores);

const $isLoading = getArchiveDataFx.pending;

const NodeIdGate = createGate<{ nodeId: number }>();

sample({
  source: NodeIdGate.state.map(({ nodeId }) => nodeId),
  clock: $archiveFilter,
  fn: (nodeId, filter) => ({ nodeId, ...filter }),
  target: getArchiveDataFx,
});

sample({
  source: $archiveFilter,
  clock: NodeIdGate.open.map(({ nodeId }) => nodeId),
  fn: (filter, nodeId) => ({ nodeId, ...filter }),
  target: getArchiveDataFx,
});

forward({
  from: getArchiveDataFx.doneData,
  to: setDataToStore,
});

forward({
  from: NodeIdGate.close,
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
  },
  gates: { NodeIdGate },
};
