import { RangePeriod } from '01/features/reports/CreateReportModal/types';
import { ReportType } from '01/_pages/Graph/components/GraphView/GraphView.types';
import { GraphParamsType } from '01/_pages/Graph/Graph';
import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import moment from 'moment';
import { requestNodeReadings } from './displayNodesStatisticsService.api';
import {
  ArchiveReadingsFilter,
  DateRange,
} from './displayNodesStatisticsService.types';

const domain = createDomain('displayNodesStatisticsService');

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
  .on(setArchiveFilter, (_, filter) => filter);

const getArchiveDataFx = domain.createEffect(requestNodeReadings);

const NodeIdGate = createGate<{ nodeId: number }>();

export const displayNodesStatisticsService = {
  inputs: {
    setArchiveFilter,
    setGraphType,
  },
  outputs: {
    $archiveFilter,
    $graphType,
  },
  gates: { NodeIdGate },
};
