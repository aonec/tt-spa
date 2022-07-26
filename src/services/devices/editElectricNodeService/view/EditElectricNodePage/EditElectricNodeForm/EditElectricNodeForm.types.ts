import { ElectricHousingMeteringDeviceResponse } from '../../api/types';
import { UpdateElectricHousingMeteringDevice } from '../EditElectricNodePage.types';

export type EditElectricNodeFormProps = {
  device: ElectricHousingMeteringDeviceResponse;
  isLoading: boolean;
  handleUpdateElectricHousingMeteringDevice: (
    payload: UpdateElectricHousingMeteringDevice
  ) => void;
};

export type UpdateElectricHousingMeteringDeviceForm = Omit<
  UpdateElectricHousingMeteringDevice,
  'deviceId'
>;
