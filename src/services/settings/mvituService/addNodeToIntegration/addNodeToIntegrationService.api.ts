import { axios } from 'api/axios';

export const addNodeToIntegrationService = () =>
  axios.post('/integration/node');
