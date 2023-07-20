import { AppointmentResponse } from 'api/myApi';
import { AppointmentsByHousingStocks } from './DistrictsMap.types';

export const prepareAppointments = (
  appointments: AppointmentResponse[],
): AppointmentsByHousingStocks[] => {
  return appointments.reduce((acc, appointment) => {
    const existingAddress = acc.find(
      (elem) => elem.address.houseId === appointment.address?.houseId,
    );

    if (existingAddress) {
      return acc.map((elem) =>
        elem.address.houseId === appointment.address?.houseId
          ? { ...elem, appointments: [...elem.appointments, appointment] }
          : elem,
      );
    }

    if (!existingAddress && appointment.address) {
      const appointmentsByHouse: AppointmentsByHousingStocks = {
        address: appointment.address,
        appointments: [appointment],
      };

      return [...acc, appointmentsByHouse];
    }

    return acc;
  }, [] as AppointmentsByHousingStocks[]);
};
