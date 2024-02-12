import { createQuery } from 'api/farfetched';
import { ApartmentActResponsePagedList } from 'api/types';
import { ApartmentActsRequestQuery } from './apartmentReadingsActsJournalService.types';

export const apartmentActsListQuery = createQuery<
  ApartmentActsRequestQuery,
  ApartmentActResponsePagedList
>({
  url: 'ApartmentActs',
});
