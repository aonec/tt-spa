import { axios } from '01/axios';
import { DocumentResponse } from 'myApi';

export const getApartmentDocumentsList = (
  apartmentId: number
): Promise<DocumentResponse[]> =>
  axios.get(`Apartments/${apartmentId}/Documents`);
