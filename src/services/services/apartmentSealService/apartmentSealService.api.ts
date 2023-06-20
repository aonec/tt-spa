import { axios } from '01/axios';
import { IndividualDeviceListItemResponsePagedList } from 'myApi';
import { AppointmentResponse } from 'myApi';

export const getIndividualDevices = (
  ApartmentId?: number,
): Promise<IndividualDeviceListItemResponsePagedList> =>
  axios.get('IndividualDevices', { params: { ApartmentId } });

export const getNearestAppointmentForApartment = (
  ApartmentId: number,
): Promise<AppointmentResponse[]> =>
  axios.get('IndividualSeal/Appointments', { params: { ApartmentId } });
