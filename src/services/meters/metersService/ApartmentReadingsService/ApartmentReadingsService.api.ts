import { axios } from '01/axios';
import { ApartmentListResponsePagedList, ApartmentResponse } from 'myApi';
import { GetApartmentsRequestPayload } from './ApartmentReadingsService.types';

const getApartmentId = async (
  params: Omit<GetApartmentsRequestPayload, 'ApartmentId'>
) => {
  const apartments: ApartmentListResponsePagedList | null = await axios.get(
    'Apartments',
    { params }
  );

  const apartmentItem = apartments?.items?.[0];

  if (!apartmentItem) return null;

  const { id } = apartmentItem;

  return id;
};

export const getApartment = async ({
  ApartmentId,
  ...params
}: GetApartmentsRequestPayload): Promise<ApartmentResponse | null> => {
  const id = ApartmentId || (await getApartmentId(params));

  const apartment: ApartmentResponse | null = await axios.get(
    `/Apartments/${id}`
  );

  return apartment;
};
