import { Moment } from 'moment';
import {
  EHousingMeteringDeviceType,
  EResourceType,
  PipeHousingMeteringDeviceResponse,
} from 'myApi';

export type EditHousingMeteringDeviceCommonInfoProps = {
  housingMeteringDevice: PipeHousingMeteringDeviceResponse | null;
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
