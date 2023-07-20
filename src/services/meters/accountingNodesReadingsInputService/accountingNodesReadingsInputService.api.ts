import { axios } from 'api/axios';
import {
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'api/myApi';
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

export const createOrUpdateNonResidentialRoomConsumption = ({
  nonResidentialRoomConsumption,
  oldReadingId,
}: UpdateHousingMeteringDeviceReadingsPayload): Promise<HousingMeteringDeviceReadingsIncludingPlacementResponse> =>
  axios.put('HousingMeteringDeviceReadings', {
    nonResidentialRoomConsumption,
    id: oldReadingId,
  });

export const deleteNodeReading = ({ id }: DeleteNodeReading) =>
  axios.post(`HousingMeteringDeviceReadings/${id}/remove`, {
    readingId: id,
  });
