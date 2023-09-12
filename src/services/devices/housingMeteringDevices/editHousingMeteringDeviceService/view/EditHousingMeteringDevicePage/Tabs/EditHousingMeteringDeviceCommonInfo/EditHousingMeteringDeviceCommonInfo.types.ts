import {
  CommunicationPipeResponse,
  EHousingMeteringDeviceType,
  EResourceType,
  PipeHousingMeteringDeviceResponse,
  UpdatePipeHousingMeteringDeviceRequest,
} from 'api/types';
import { Dayjs } from 'dayjs';

export type EditHousingMeteringDeviceCommonInfoProps = {
  housingMeteringDevice: PipeHousingMeteringDeviceResponse | null;
  handleSubmitForm: (payload: UpdatePipeHousingMeteringDeviceRequest) => void;
  deviceId: string;
  onCancel: () => void;
  communicationPipes: CommunicationPipeResponse[];
};

export type EditHousingMeteringDeviceCommonInfoFormTypes = {
  resource: EResourceType | null;
  housingMeteringDeviceType: EHousingMeteringDeviceType | null;
  model: string | null;
  serialNumber: string | null;
  lastCheckingDate: Dayjs | null;
  futureCheckingDate: Dayjs | null;
  communicationPipeId: number | null;
};
