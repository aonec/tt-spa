import { saveAs } from 'file-saver';

import { axios } from 'api/axios';
import { ApartmentActResponsePagedList, DocumentResponse } from 'myApi';

export const fetchPreviousActs = (
  ApartmentId: number,
): Promise<ApartmentActResponsePagedList> =>
  axios.get('ApartmentActs', {
    params: {
      ApartmentId,
      ActJobDateOrderBy: 'Descending',
      PageSize: 2,
    },
  });

export const fetchSaveFile = async (document: DocumentResponse) => {
  const url: string = await axios.get(`Documents/${document.id}`);
  saveAs(url, document.name!);
};
