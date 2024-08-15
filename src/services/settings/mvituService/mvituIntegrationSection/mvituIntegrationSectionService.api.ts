import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { GetMvituNodesRequestParams } from './mvituIntegrationSectionService.types';
import { MvituNodeResponsePagedList } from 'api/mvitu.types';

export const mvituNodesQuery = createQuery<
  GetMvituNodesRequestParams,
  MvituNodeResponsePagedList
>({
  handler: () => axios.get('mvitu/Nodes'),
});
