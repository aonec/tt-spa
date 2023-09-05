export enum DeviceConnectionType {
  Connected = 'Connected',
  NotConnected = 'NotConnected',
  All = 'All',
}

export const IsConnectedToBooleanDictionary = {
  [DeviceConnectionType.Connected]: true,
  [DeviceConnectionType.NotConnected]: false,
  [DeviceConnectionType.All]: undefined,
};
