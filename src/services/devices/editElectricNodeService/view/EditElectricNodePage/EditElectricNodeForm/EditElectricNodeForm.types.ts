import { ElectricHousingMeteringDeviceResponse } from 'myApi';
import { EditElectricNodePayload } from 'services/devices/editElectricNodeService/editElectricNodeService.types';
import { UpdateElectricHousingMeteringDevice } from '../EditElectricNodePage.types';

export type EditElectricNodeFormProps = {
  device: ElectricHousingMeteringDeviceResponse;
  isLoading: boolean;
  handleUpdateElectricHousingMeteringDevice: (
    payload: EditElectricNodePayload
  ) => void;
};

