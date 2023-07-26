import axios from 'axios';
import { ApartmentResponse } from 'api/types';

export const getSamePersonalAccountNumderApartmentData = (
  apartmentId: number,
): Promise<ApartmentResponse> => axios.get(`Apartments/${apartmentId}`);
