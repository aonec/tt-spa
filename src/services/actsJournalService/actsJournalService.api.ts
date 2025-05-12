import { axios } from 'api/axios';
import {
  AddApartmentActRequest,
  ApartmentActResponsePagedList,
  EDocumentType,
} from 'api/types';
import queryString from 'query-string';
import { ActsJournalRequestParams } from './actsJournalService.types';
import { Document } from 'ui-kit/DocumentsService';

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

export function uploadFile(file: File): Promise<Document> {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('type', EDocumentType.Common);

  return axios.post('documents/upload', formData);
}

// export const deleteFileMutation = createMutation({
//   handler: createEffect<TemperatureNormativeDeleteRequest, void>((payload) =>
//     axios.delete('ManagingFirms/TemperatureNormatives', { data: payload }),
//   ),
// });
