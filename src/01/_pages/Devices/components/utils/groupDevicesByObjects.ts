import {
  CalculatorListResponse,
  HousingStockAddressResponse,
} from '../../../../../myApi';

export const groupDevicesByObjects = (
  devices: CalculatorListResponse[] | null
): DevicesByAddressInterface[] => {
  if (!devices) return [];
  const newDevices = devices.reduce<DevicesByAddressInterface[]>(
    (accum, device) => {
      if (!device.address) return [...accum, { devices: [{ ...device }] }];
      const { address, ...rest } = device;
      const index = accum.findIndex((el) => el.address?.id === address?.id);
      if (index === -1) {
        return [...accum, { address, devices: [{ ...rest }] }];
      } else {
        return accum.map((el, i) => {
          if (i !== index) return el;
          return el.devices
            ? { ...el, devices: [...el.devices, rest] }
            : { ...el, devices: [rest] };
        });
      }
    },
    []
  );
  return newDevices;
};

export interface DevicesByAddressInterface {
  devices: Omit<CalculatorListResponse, 'address'>[] | null;
  address?: HousingStockAddressResponse;
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
  hubNumber: number | null;
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
  hubNumber: number | null;
  pipeNumber: number;
  magistral: string;
}
