/* eslint-disable */

import axios from '../../api/axios';
import { createDevice } from '01/_api/utils';
import { formReadingToPush } from '../../utils/formReadingsToPush';

export async function getApartments(params) {
  try {
    const res = await axios.get('apartments', {
      params: { ...params, PageSize: 50, PageNumber: 1 },
    });
    return { apartments: res };
  } catch (error) {}
}

export async function getApartmentInfo(id) {
  try {
    const res = await Promise.allSettled([
      axios.get(`apartments/${id}`),
      axios.get('IndividualDevices', { params: { ApartmentId: id } }),
    ]);

    const [{ value: apartInfo }, { value: meterDevices }] = res;
    return {
      apartInfo,
      meterDevices: {
        ...meterDevices,
        items: meterDevices.items.map(createDevice),
      },
    };
  } catch (error) {}
}

export const sendReadings = (device) => {
  try {
    axios.post('/IndividualDeviceReadings/create', formReadingToPush(device));
  } catch (e) {
    throw new Error();
  }
};
