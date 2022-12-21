import { MeteringDeviceConnection } from 'myApi';

export type ConnectionInfoProps = {
  connection: MeteringDeviceConnection | null;
  isConnected: boolean;
};
