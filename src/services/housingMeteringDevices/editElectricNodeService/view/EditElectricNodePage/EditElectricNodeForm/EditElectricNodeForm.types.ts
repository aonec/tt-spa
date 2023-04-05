import { ElectricHousingMeteringDeviceResponse } from 'myApi';
import { EditElectricNodePayload } from 'services/housingMeteringDevices/editElectricNodeService/editElectricNodeService.types';

export type EditElectricNodeFormProps = {
  device: ElectricHousingMeteringDeviceResponse;
  isLoading: boolean;
  handleUpdateElectricHousingMeteringDevice: (
    payload: EditElectricNodePayload,
  ) => void;
};
