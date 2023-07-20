import axios from 'axios';
import { ApartmentResponse } from 'api/myApi';

export const getSamePersonalAccountNumderApartmentData = (
  apartmentId: number,
): Promise<ApartmentResponse> => axios.get(`Apartments/${apartmentId}`);
