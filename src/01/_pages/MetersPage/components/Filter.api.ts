import {
  ApartmentListResponse,
  ApartmentListResponsePagedList,
} from './../../../../myApi';
import { axios } from '01/axios';
import { GetApartmentRequestPayload } from './Filter.types';

export const getApartment = async ({
  city,
  street,
  apartment,
  house,
  question,
}: GetApartmentRequestPayload): Promise<ApartmentListResponse | null> => {
  const res: ApartmentListResponsePagedList = await axios.get('Apartments', {
    params: {
      City: city,
      Street: street,
      ApartmentNumber: apartment,
      HousingStockNumber: house,
      Question: question,
      PageSize: 1,
      PageNumber: 1,
    },
  });

  if (res.items) return res.items[0];

  return null;
};
