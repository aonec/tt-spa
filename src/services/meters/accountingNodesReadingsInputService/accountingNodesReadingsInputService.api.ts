import { axios } from '01/axios';
import {
  GetHousingMeteringDeviceReadingsResponse,
  HousingMeteringDeviceReadingsIncludingPlacementResponse,
} from 'myApi';
import {
  CreateHousingMeteringDeviceReadingsPayload,
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
): Promise<void> => axios.post('HousingMeteringDeviceReadings', reading);

export const createOrUpdateNonResidentialRoomConsumption = (
  payload: UpdateHousingMeteringDeviceReadingsPayload,
): Promise<void> => axios.put('HousingMeteringDeviceReadings', payload);
