export enum EIsDeviceConnectedType {
  Connected = 'Connected',
  NotConnected = 'NotConnected',
  All = 'All',
}

export const IsConnectedToBooleanDictionary = {
  [EIsDeviceConnectedType.Connected]: true,
  [EIsDeviceConnectedType.NotConnected]: false,
  [EIsDeviceConnectedType.All]: undefined,
};
