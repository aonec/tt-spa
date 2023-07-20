import {
  CommunicationPipeResponse,
  PipeHousingMeteringDeviceResponse,
  UpdatePipeHousingMeteringDeviceRequest,
} from 'api/types';
import { EditHousingMeteringDeviceTabs } from '../../editHousingMeteringDeviceService.types';

export type EditHousingMeteringDevicePageProps = {
  handleChangeTab: (payload: EditHousingMeteringDeviceTabs) => void;
  currentTab: EditHousingMeteringDeviceTabs;
  housingMeteringDevice: PipeHousingMeteringDeviceResponse | null;
  handleSubmitForm: (payload: UpdatePipeHousingMeteringDeviceRequest) => void;
  deviceId: string;
  communicationPipes: CommunicationPipeResponse[];
};
