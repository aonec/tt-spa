import {ReadingType} from "../../../../types/types";

export const individualDeviceTypeTemplate = {
  address: {
    apartmentId: 236276,
    apartmentNumber: '2',
    id: 118,
    city: 'Нижнекамск',
    street: 'Студенческая',
    housingStockNumber: '36',
    corpus: null,
  },
  resource: 'HotWaterSupply',
  mountPlace: 'Toilet',
  rateType: 'OneZone',
  readings: [
    {
      id: 1899863,
      hasError: true,
      status: 'Unknown',
      statusMessage: null,
      value1: '67',
      value2: null,
      value3: null,
      value4: null,
      readingDate: '2020-11-28',
      uploadTime: '2020-11-28T02:00:50.316121',
    },
    {
      id: 1723505,
      hasError: true,
      status: 'Unknown',
      statusMessage: null,
      value1: '67',
      value2: null,
      value3: null,
      value4: null,
      readingDate: '2020-10-31',
      uploadTime: '2020-11-02T10:22:10.517325',
    },
    {
      id: 237410,
      hasError: false,
      status: 'Unknown',
      statusMessage: null,
      value1: '67',
      value2: null,
      value3: null,
      value4: null,
      readingDate: '2019-11-01',
      uploadTime: '2019-11-21T00:00:00',
    },
    {
      id: 237418,
      hasError: false,
      status: 'Unknown',
      statusMessage: null,
      value1: '60',
      value2: null,
      value3: null,
      value4: null,
      readingDate: '2019-10-01',
      uploadTime: '2019-10-22T00:00:00',
    },
  ],
  id: 236564,
  transactionType: null,
  model: 'СГВ-15',
  serialNumber: '0101604404',
  lastCommercialAccountingDate: '2017-12-10T03:00:00',
  futureCommercialAccountingDate: '2017-12-10T03:00:00',
  lastCheckingDate: '2018-09-07T03:00:00',
  futureCheckingDate: '2024-09-07T03:00:00',
  closingDate: null,
};

export type IndividualDeviceType = {
  address: {
    apartmentId: number,
    apartmentNumber: string,
    id: number,
    city: string,
    street: string,
    housingStockNumber: string,
    corpus: string | null
  },
  resource: string,
  mountPlace: string,
  rateType: string,
  readings: Array<ReadingType>,
  id: number,
  transactionType: string | null,
  model: string,
  serialNumber: string,
  lastCommercialAccountingDate: string | null,
  futureCommercialAccountingDate: string | null,
  lastCheckingDate: string | null,
  futureCheckingDate: string | null,
  closingDate: string | null,
}

export type DeviceContextType = {
  device: IndividualDeviceType,
  tasks: Array<Task>,
  mistake: Array<any>,
}

export type Task = {
  id: number
}

export interface ParamTypes {
  0: string
  1: string
  2: string
}