import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';

export const dataQuery = createQuery({
  handler: () => axios.get(``),
});
