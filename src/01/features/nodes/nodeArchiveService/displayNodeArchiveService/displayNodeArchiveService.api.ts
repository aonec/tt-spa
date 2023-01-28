import { axios } from '01/axios';
import {
  GetNodeArchiveDataRequestParams,
  NodeArchiveData,
} from './displayNodeArchiveService.types';

export const getNodeArchiveData = (
  params: GetNodeArchiveDataRequestParams
): Promise<NodeArchiveData> => axios.get('Reports/ReportData', { params });
