import { groupBy } from 'lodash';
import { PipeNodeResponse } from 'api/types';
import { DevicesByAddressInterface } from 'services/devices/displayDevicesService/displayDevicesService.types';

export const groupDevicesByObjects = (
  devices: PipeNodeResponse[],
): DevicesByAddressInterface[] => {
  const devicesByAddresses = Object.values(
    groupBy(devices, (value) => {
      const address = value.address?.address?.mainAddress;
      return `${address?.street} ${address?.housingStockId}`;
    }),
  ).map((devices) => ({
    devices: Object.values(groupBy(devices, (device) => device.calculatorId)),
    building: devices[0].address,
  }));

  return devicesByAddresses;
};
