import { groupBy } from 'lodash';
import { CalculatorListResponse, HousingStockAddressResponse } from '../../../../../api/types';


export const groupDevicesByObjects = (
  devices: CalculatorListResponse[]
): DevicesByAddressInterface[] => {
  const devicesByAddresses = Object.values(
    groupBy(devices, 'address.address.mainAddress.housingStockId')
  ).map((devices) => ({
    devices,
    address: devices[0].address?.address,
  }));

  return devicesByAddresses;
};

export interface DevicesByAddressInterface {
  devices: CalculatorListResponse[];
  address?: HousingStockAddressResponse | null;
}

interface ManagementFirmInterface {
  id: number;
  name: string;
  phoneNumber: string | null;
  information: string | null;
  timeZoneOffset: string;
}

export interface CommunicationPipeInterface {
  devices: DeviceInterface[];
  entryNumber: number;
  id: number;
  magistral: string;
  number: number;
}

export interface DeviceInterface {
  closingDate: string | null;
  diameter: string;
  futureCheckingDate: string | null;
  futureCommercialAccountingDate: string | null;
  housingMeteringDeviceType: string;
  hub: HubInterface;
  id: number;
  lastCheckingDate: string | null;
  lastCommercialAccountingDate: string | null;
  managementFirm: ManagementFirmInterface;
  model: string;
  resource: string;
  serialNumber: string;
}

interface HubInterface {
  entryNumber: number;
  pipeNumber: number;
  magistral: string;
}
