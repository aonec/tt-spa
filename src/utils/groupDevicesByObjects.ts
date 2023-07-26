import { groupBy } from 'lodash';
import { CalculatorListResponse } from 'api/types';
import { DevicesByAddressInterface } from 'services/devices/displayDevicesService/displayDevicesService.types';

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
    building: devices[0].address,
  }));

  return devicesByAddresses;
};
