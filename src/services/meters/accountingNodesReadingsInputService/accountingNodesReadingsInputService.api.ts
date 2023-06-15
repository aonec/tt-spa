import { axios } from '01/axios';
import {
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';
import {
  CreateHousingMeteringDeviceReadingsPayload,
  DeleteNodeReading,
  UpdateHousingMeteringDeviceReadingsPayload,
} from './accountingNodesReadingsInputService.types';

export const fetchReadingsOfElectricNode = async ({
  nodeId,
}: {
  nodeId: number;
}): Promise<HousingMeteringDeviceReadingsIncludingPlacementResponse[]> => {
  const res: GetHousingMeteringDeviceReadingsResponse = await axios.get(
    'HousingMeteringDeviceReadings',
    {
      params: { nodeId },
    },
  );

  return res?.items || [];
};

export const createOrUpdateNodeReading = (
  reading: CreateHousingMeteringDeviceReadingsPayload,
): Promise<HousingMeteringDeviceReadingsIncludingPlacementResponse> =>
  axios.post('HousingMeteringDeviceReadings', reading);

export const createOrUpdateNonResidentialRoomConsumption = (
  payload: UpdateHousingMeteringDeviceReadingsPayload,
): Promise<void> => axios.put('HousingMeteringDeviceReadings', payload);

export const deleteNodeReading = ({ id }: DeleteNodeReading) =>
  axios.post(`HousingMeteringDeviceReadings/${id}/remove`, {
    readingId: id,
  });
