import { axios } from '01/axios';
import { ElectricNodeResponse, NodesPagedList } from 'myApi';
import { GetElectricNodesRequestParams } from './AccountingNodesReadingsService.types';

export const getElectricNodes = async (
  requestPayload: GetElectricNodesRequestParams,
): Promise<ElectricNodeResponse[]> => {
  const res: NodesPagedList = await axios.get('Nodes', {
    params: requestPayload,
  });

  return res.electricNodes || [];
};
