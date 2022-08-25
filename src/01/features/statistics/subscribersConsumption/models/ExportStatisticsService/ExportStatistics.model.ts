import { message } from 'antd';
import { createDomain } from 'effector';
import { StatsisticsPayload } from '..';
import { downloadStatistics } from './ExportStatistics.api';

const domain = createDomain('exportStatistics');

const exportStatisticsFx = domain.createEffect<StatsisticsPayload, void>(
  downloadStatistics
);

exportStatisticsFx.watch(() => message.info('Выгрузка задач...'));

exportStatisticsFx.done.watch(() =>
  message.success('Статистика успешно выгружена!')
);

export const exportStatisticsService = {
  inputs: {
    exportStatisticsFx,
  }
};