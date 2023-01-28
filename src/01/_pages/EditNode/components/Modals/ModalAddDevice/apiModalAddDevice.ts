import axios from '../../../../../axios';
import { CreatePipeHousingMeteringDeviceRequest } from '../../../../../../myApi';

export const addHousingMeteringDevice = (
  form: CreatePipeHousingMeteringDeviceRequest
): Promise<void> => axios.post('PipeHousingMeteringDevices', form);
