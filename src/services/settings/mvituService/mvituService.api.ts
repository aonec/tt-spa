import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { StatusResponse } from 'api/mvitu.types';

export const mvituIntegrationQuery = createQuery<void, StatusResponse>({
  handler: () => axios.get('mvitu/Integrations'),
});
