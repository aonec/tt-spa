import { ReadingType } from '../../../../types';

export type IndividualDeviceType = {
  address: {
    apartmentId: number;
    apartmentNumber: string;
    id: number;
    city: string;
    street: string;
    housingStockNumber: string;
    corpus: string | null;
  };
  resource: string;
  mountPlace: string;
  rateType: string;
  readings: Array<ReadingType>;
  id: number;
  transactionType: string | null;
  model: string;
  serialNumber: string;
  lastCommercialAccountingDate: string | null;
  futureCommercialAccountingDate: string | null;
  lastCheckingDate: string | null;
  futureCheckingDate: string | null;
  closingDate: string | null;
};

export type DeviceContextType = {
  device: IndividualDeviceType;
  tasks: Array<Task> | undefined;
  mistake: Array<any> | undefined;
};

export type Task = {
  id: number;
};

export interface ParamTypes {
  0: string;
  1: string;
  2: string;
}
