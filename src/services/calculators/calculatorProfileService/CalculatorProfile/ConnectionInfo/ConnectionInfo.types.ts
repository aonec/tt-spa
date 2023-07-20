import { MeteringDeviceConnection } from 'api/myApi';

export type ConnectionInfoProps = {
  connection: MeteringDeviceConnection | null;
  isConnected: boolean;
};
