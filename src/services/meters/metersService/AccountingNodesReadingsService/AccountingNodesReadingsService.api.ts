import { axios } from 'api/axios';
import {
  BuildingListResponse,
  BuildingListResponsePagedList,
  ElectricNodeResponse,
  NodesPagedList,
} from 'api/types';
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

export const getBuildingQuery = createQuery({
  effect: createEffect<GetElectricNodesRequestParams, BuildingListResponse[]>(
    async (requestPayload) => {
      const res: BuildingListResponsePagedList = await axios.get('Buildings', {
        params: {
          City: requestPayload['Address.City'],
          Street: requestPayload['Address.Street'],
          BuildingNumber: requestPayload['Address.HousingStockNumber'],
          Corpus: requestPayload['Address.Corpus'],
        },
      });

      return res.items || [];
    },
  ),
});
