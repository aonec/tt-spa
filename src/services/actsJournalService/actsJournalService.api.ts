import { axios } from '01/axios';
import { AddApartmentActRequest, ApartmentActResponsePagedList } from 'myApi';
import { stringify } from 'query-string';
import { ActsJournalRequestParams } from './actsJournalService.types';

export const fetchActs = (
  params: ActsJournalRequestParams,
): Promise<ApartmentActResponsePagedList> =>
  axios.get('ApartmentActs', {
    params,
    paramsSerializer: (params) =>
      stringify(params, {
        arrayFormat: 'none',
        skipEmptyString: true,
        skipNull: true,
      }),
  });

export const addAct = (payload: AddApartmentActRequest): Promise<void> =>
  axios.post('ApartmentActs', payload);
