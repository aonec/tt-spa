/* eslint-disable */

import axios from '../../api/axios';

export async function getDevicesByApartment(apartmentId) {
  const devices = await axios.get(
    `IndividualDevices?ApartmentId=${apartmentId}&TakeReadings=1`
  );
  return devices.items;
}
