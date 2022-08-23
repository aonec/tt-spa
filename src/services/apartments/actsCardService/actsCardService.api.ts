import { axios } from '01/axios';
import { ApartmentActResponsePagedList, DocumentResponse } from 'myApi';

export const fetchPreviousActs = (
  apartmentId: number
): Promise<ApartmentActResponsePagedList> =>
  axios.get('ApartmentActs', {
    params: {
      City: 'Нижнекамск',
      Street: 'Химиков',
      HousingStockNumber: '20',
      ApartmentNumber: '10',
      ActJobDateOrderBy: 'Descending',
      PageSize: 2,
    },
  });

export const fetchSaveFile = async (document: DocumentResponse) => {
  const url: string = await axios.get(`Documents/${document.id}`);
  saveAs(url, document.name!);
};
