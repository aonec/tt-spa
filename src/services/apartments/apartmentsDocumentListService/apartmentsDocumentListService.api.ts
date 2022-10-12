import { axios } from '01/axios';
import { DocumentResponse } from 'myApi';

export const fetchAparatmentsDocuments = (
  apartmentId: number
): Promise<DocumentResponse[]> =>
  axios.get(`Apartments/${apartmentId}/Documents`);

export const fetchSaveFile = async (document: DocumentResponse) => {
  const url: string = await axios.get(`Documents/${document.id}`);
  saveAs(url, document.name!);
};
