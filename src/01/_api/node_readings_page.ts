import axios from '../../api/axios';
import {
  ReadingsInterface,
  ReportType,
} from '../_pages/Graph/components/GraphView';
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
    from: searchQuery.from.add(moment().utcOffset(), 'minute').toISOString(true),
    to: searchQuery.to.add(moment().utcOffset(), 'minute').toISOString(true),
  };

  const readings = await axios.get<any, ReadingsInterface>('Reports/Archives', {
    params,
  });

  return { data: readings, searchQuery };
};
