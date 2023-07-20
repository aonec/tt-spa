import { ElectricHousingMeteringDeviceResponse } from 'api/types';
import { EditElectricNodePayload } from 'services/devices/editElectricNodeService/editElectricNodeService.types';

export type EditElectricNodeFormProps = {
  device: ElectricHousingMeteringDeviceResponse;
  isLoading: boolean;
  handleUpdateElectricHousingMeteringDevice: (
    payload: EditElectricNodePayload,
  ) => void;
};
