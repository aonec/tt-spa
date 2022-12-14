import { Moment } from 'moment';
import {
  EHousingMeteringDeviceType,
  EResourceType,
  PipeHousingMeteringDeviceResponse,
  UpdatePipeHousingMeteringDeviceRequest,
} from 'myApi';

export type EditHousingMeteringDeviceCommonInfoProps = {
  housingMeteringDevice: PipeHousingMeteringDeviceResponse | null;
  handleSubmitForm: (payload: {
    deviceId: number;
    request: UpdatePipeHousingMeteringDeviceRequest;
  }) => void;
  deviceId: string;
  onCancel: () => void;
};

export type EditHousingMeteringDeviceCommonInfoFormTypes = {
  resource: EResourceType | null;
  housingMeteringDeviceType: EHousingMeteringDeviceType | null;
  model: string | null;
  serialNumber: string | null;
  lastCheckingDate: Moment | null;
  futureCheckingDate: Moment | null;
  diameter: number | null;
  pipeNumber: number | null;
  magistral: string | null;
  city: string | null;
  street: string | null;
  housingStockNumber: string | null;
  corpus: string | null;
};
