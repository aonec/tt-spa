import { axios } from '01/axios';
import { ApartmentListResponsePagedList, ApartmentResponse } from 'myApi';
import {
  GetApartmentsRequestPayload,
  UpdateApartmentRequestPayload,
} from './ApartmentReadingsService.types';

export const getApartment = async ({
  ApartmentId,
  ...params
}: GetApartmentsRequestPayload): Promise<ApartmentResponse | null> => {
  if (!ApartmentId) {
    const apartments: ApartmentListResponsePagedList | null = await axios.get(
      'Apartments',
      { params }
    );

    const apartmentItem = apartments?.items?.[0];

    if (!apartmentItem) return null;

    const { id } = apartmentItem;

    ApartmentId = id;
  }

  const apartment: ApartmentResponse | null = await axios.get(
    `/Apartments/${ApartmentId}`
  );

  return apartment;
};

export const putApartment = ({
  apartmentId,
  ...data
}: UpdateApartmentRequestPayload): Promise<ApartmentResponse> =>
  axios.put(`Apartments/${apartmentId}`, data);
