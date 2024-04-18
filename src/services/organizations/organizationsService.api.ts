import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { OrganizationResponsePagedList } from 'api/types';

export const organizationsQuery = createQuery<
  void,
  OrganizationResponsePagedList
>({ handler: () => axios.get('Organizations') });
