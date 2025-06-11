import { axios } from 'api/axios';
import {
  AddApartmentActRequest,
  ApartmentActResponsePagedList,
  DocumentResponse,
  EDocumentType,
} from 'api/types';
import queryString from 'query-string';
import { ActsJournalRequestParams } from './actsJournalService.types';

export const fetchActs = (
  params: ActsJournalRequestParams,
): Promise<ApartmentActResponsePagedList> =>
  axios.get('ApartmentActs', {
    params,
    paramsSerializer: (params) =>
      queryString.stringify(params, {
        arrayFormat: 'none',
        skipEmptyString: true,
        skipNull: true,
      }),
  });

export const addAct = (payload: AddApartmentActRequest): Promise<void> =>
  axios.post('ApartmentActs', payload);

export function uploadFile(file: File): Promise<DocumentResponse[]> {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('type', EDocumentType.Common);

  return axios.post('documents/upload', formData);
}

export const deleteDocument = (id: number): Promise<void> =>
  axios.delete(`Documents/${id}`);

export const fetchDocUrl = (id: number): Promise<string> =>
  axios.get(`Documents/${id}`);
