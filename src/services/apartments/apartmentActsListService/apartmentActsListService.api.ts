import { axios } from '../../api/axios';
import { ApartmentActResponse, DocumentResponse } from '../../api/types';

export const getapartmentActsList = async (
  apartmentId: number
): Promise<ApartmentActResponse[]> =>
  axios.get(`Apartments/${apartmentId}/Acts`);

export const saveFileRequest = async (document: DocumentResponse) => {
      const url: string = await axios.get(`Documents/${document.id}`);
      saveAs(url, document.name!);
  };
