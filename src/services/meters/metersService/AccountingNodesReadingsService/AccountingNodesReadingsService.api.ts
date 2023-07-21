import { axios } from 'api/axios';
import { ElectricNodeResponse, NodesPagedList } from 'api/types';
import { GetElectricNodesRequestParams } from './AccountingNodesReadingsService.types';

export const getElectricNodes = async (
  requestPayload: GetElectricNodesRequestParams,
): Promise<ElectricNodeResponse[]> => {
  const res: NodesPagedList = await axios.get('Nodes', {
    params: requestPayload,
  });

  return res.electricNodes || [];
};
