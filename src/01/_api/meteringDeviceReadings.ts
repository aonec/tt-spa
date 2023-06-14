import axios from '01/axios';
import {
  CreateHousingMeteringDeviceReadingsRequest,
  UpdateHousingMeteringDeviceReadingsRequest,
} from 'myApi';

export async function createOrUpdateLast(
  payload: CreateHousingMeteringDeviceReadingsRequest,
) {
  return await axios.post('HousingMeteringDeviceReadings', payload);
}

export async function updateHousingMeteringDeviceReading(
  payload: UpdateHousingMeteringDeviceReadingsRequest,
) {
  return await axios.put('HousingMeteringDeviceReadings', payload);
}

export async function deleteMeteringDeviceReading(id: string) {
  return await axios.post(`HousingMeteringDeviceReadings/${id}/remove`, {
    readingId: id,
  });
}
