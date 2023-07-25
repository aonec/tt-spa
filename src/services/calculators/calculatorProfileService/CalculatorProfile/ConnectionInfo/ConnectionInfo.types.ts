import { MeteringDeviceConnection } from 'api/types';

export type ConnectionInfoProps = {
  connection: MeteringDeviceConnection | null;
  isConnected: boolean;
};
