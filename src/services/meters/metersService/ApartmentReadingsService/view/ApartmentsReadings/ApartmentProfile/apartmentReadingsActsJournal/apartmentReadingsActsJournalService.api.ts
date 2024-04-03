import { ApartmentActResponsePagedList } from 'api/types';
import { ApartmentActsRequestQuery } from './apartmentReadingsActsJournalService.types';
import { createQuery } from '@farfetched/core';
import axios from 'api/axios';

export const apartmentActsListQuery = createQuery<
  ApartmentActsRequestQuery,
  ApartmentActResponsePagedList
>({
  handler: (query) => axios.get('ApartmentActs', { params: query }),
});
