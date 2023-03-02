import { Moment } from 'moment';
import {
  CommunicationPipeResponse,
  EHousingMeteringDeviceType,
  EResourceType,
  PipeHousingMeteringDeviceResponse,
  UpdatePipeHousingMeteringDeviceRequest,
} from 'myApi';

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
  lastCheckingDate: Moment | null;
  futureCheckingDate: Moment | null;
  communicationPipeId: number | null;
};
