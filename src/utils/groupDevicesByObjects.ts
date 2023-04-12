import { groupBy } from 'lodash';
import { CalculatorListResponse } from 'myApi';
import { DevicesByAddressInterface } from 'services/housingMeteringDevices/displayDevicesService/displayDevicesService.types';

export const groupDevicesByObjects = (
  devices: CalculatorListResponse[],
): DevicesByAddressInterface[] => {
  const devicesByAddresses = Object.values(
    groupBy(devices, (value) => {
      const address = value.address?.address?.mainAddress;
      return `${address?.street} ${address?.housingStockId}`;
    }),
  ).map((devices) => ({
    devices,
    address: devices[0].address?.address,
  }));

  return devicesByAddresses;
};
