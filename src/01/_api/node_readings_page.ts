import axios from '01/axios';
import { ReadingsInterface, ReportType } from '01/_pages/Graph/components/GraphView/GraphView.types';

import moment, { Moment } from 'moment';

delete axios.defaults.headers.common['Authorization'];

export interface QueryInterface {
  nodeId: number;
  reportType: ReportType;
  from: Moment;
  to: Moment;
}

export interface RequestNodeReadingsFunctionInterface {
  data: ReadingsInterface;
  searchQuery: QueryInterface;
}

export const requestNodeReadings = async (
  searchQuery: QueryInterface
): Promise<RequestNodeReadingsFunctionInterface> => {
  const params = {
    ...searchQuery,
    from: searchQuery.from.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    to: searchQuery.to.endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  };

  const readings = await axios.get<any, ReadingsInterface>('Reports/Archives', {
    params,
  });

  return { data: readings, searchQuery };
};
