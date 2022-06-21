import { axios } from '01/axios';
import { ApartmentActResponse, DocumentResponse } from 'myApi';

export const getapartmentActsList = async (
  apartmentId: number
): Promise<ApartmentActResponse[] | null> =>
  axios.get(`Apartments/${apartmentId}/Acts`);

export const saveFileRequest = async (document: DocumentResponse) => {
      const url: string = await axios.get(`Documents/${document.id}`);
      saveAs(url, document.name!);
  };
