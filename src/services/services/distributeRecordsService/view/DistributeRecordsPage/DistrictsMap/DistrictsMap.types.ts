import {
  AppointmentAddress,
  AppointmentResponse,
  DistrictResponse,
} from 'myApi';

export type Props = {
  districtsList: DistrictResponse[];
  handleSelectDistrict: (payload: string) => void;
  selectedDistrict: string | null;
  appointmentsInDistrict: AppointmentResponse[] | null;
};

export type AppointmentsByHousingStocks = {
  address: AppointmentAddress;
  appointments: AppointmentResponse[];
};
