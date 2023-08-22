import { axios } from 'api/axios';
import { ElectricNodeResponse, NodesPagedList } from 'api/types';
import { GetElectricNodesRequestParams } from './AccountingNodesReadingsService.types';
import { createQuery } from '@farfetched/core';
import { createEffect } from 'effector';

export const getElectricNodesQuery = createQuery({
  effect: createEffect<GetElectricNodesRequestParams, ElectricNodeResponse[]>(
    async (requestPayload) => {
      const res: NodesPagedList = await axios.get('Nodes', {
        params: requestPayload,
      });

      return res.electricNodes || [];
    },
  ),
});
